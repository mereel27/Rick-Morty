import { Link, useLocation } from 'react-router-dom';

export default function CharCard({ char, link }) {
  const location = useLocation();
  return (
    <div className="character">
      <Link to={link} state={location} className="character__link">
        <div className="character__wrapper">
          <div className="character__image-box">
            <img
              className="character__image"
              src={char.image}
              alt={char.name}
              width="240"
              height="240"
            />
          </div>
          <div className="character__info">
            <h6 className="character__name">{char.name}</h6>
            <span className="character__species">{char.species}</span>
          </div>
        </div>
        <div className="character__bg"></div>
      </Link>
    </div>
  );
}
