import rick from '../assets/img/rick.svg';

export default function NotFound() {
  return (
    <div className="error">
      <img
        className="error__img"
        src={rick}
        alt="not found"
      ></img>
      <p className="error__message">No search results :(</p>
    </div>
  );
}
