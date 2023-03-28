import { useLoaderData, defer, Await, Link, useLocation } from 'react-router-dom';
import { Suspense } from 'react';

export default function CharDetails() {
  const { state } = useLocation();
  const data = useLoaderData();
  return (
    <>
      <Link className="link-back" to={`${state?.pathname || '/'}${state?.search || ''}`}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16 7H3.83L9.42 1.41L8 0L0 8L8 16L9.41 14.59L3.83 9H16V7Z"
            fill="black"
          />
        </svg>
        <span className="link__text">GO BACK</span>
      </Link>
      <Suspense fallback={<div className="lds-dual-ring"></div>}>
        <Await resolve={data.details}>
          {({ image, name, origin: { name: originName }, species, status, type, gender }) => (
            <article className="details">
              <img className="details__image" src={image} alt={name} />
              <h1 className="details__name">{name}</h1>
              <span className="details__label">Information</span>
              <div className="details__data">
                <div className="details__data__box">
                  <span className="details__data__name">Gender</span>
                  <span className="details__data__value">{gender}</span>
                </div>
                <div className="details__data__box">
                  <span className="details__data__name">Status</span>
                  <span className="details__data__value">{status}</span>
                </div>
                <div className="details__data__box">
                  <span className="details__data__name">Specie</span>
                  <span className="details__data__value">{species}</span>
                </div>
                <div className="details__data__box">
                  <span className="details__data__name">Origin</span>
                  <span className="details__data__value">{originName}</span>
                </div>
                <div className="details__data__box">
                  <span className="details__data__name">Type</span>
                  <span className="details__data__value">
                    {type || 'Unknown'}
                  </span>
                </div>
              </div>
            </article>
          )}
        </Await>
      </Suspense>
    </>
  );
}

export async function charLoader({ params }) {
  const data = fetch(
    `https://rickandmortyapi.com/api/character/${params.id}`
  ).then((response) => response.json());
  return defer({ details: data });
}
