export default function SkeletonList({ length }) {
  return (
    <>
      <section className="characters-box">
        {Array(length || 10)
          .fill({})
          .map((_, index) => (
            <div className="character-skeleton" key={index}>
              <div className="character-skeleton__img" />
              <div className="character-skeleton__info">
                <div className="character-skeleton__name"></div>
                <div className="character-skeleton__species"></div>
              </div>
            </div>
          ))}
      </section>
      <div className="pagination-skeleton"></div>
    </>
  );
}
