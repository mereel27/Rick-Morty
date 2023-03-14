export default function CharCard({ char, handleClick }) {
  return (
    <article className="character" onClick={handleClick}>
      <img className="character__image" src={char.image} alt={char.name} width='240' height='240' />
      <div className="character__info">
        <h6 className="character__name">{char.name}</h6>
        <span className="character__species">{char.species}</span>
      </div>
    </article>
  );
}
