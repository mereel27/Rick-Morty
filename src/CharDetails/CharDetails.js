import { useLoaderData, useNavigate } from 'react-router-dom';
import "@fontsource/karla/700.css";

export default function CharDetails() {
  const navigate = useNavigate();
  const {
    image,
    name,
    origin: { name: originName },
    species,
    status,
    type,
    gender,
  } = useLoaderData();
  return (
    <>
      <button className="link-back" onClick={() => navigate(-1)}>
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
      </button>
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
            <span className="details__data__value">{type || 'Unknown'}</span>
          </div>
        </div>
      </article>
    </>
  );
}

export async function charLoader({ params }) {
  return await fetch(`https://rickandmortyapi.com/api/character/${params.id}`);
}
