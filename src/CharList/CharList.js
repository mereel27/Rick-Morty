import { useOutletContext } from 'react-router-dom';
import CharCard from '../CharCard/CharCard.js';
import Pagination from '../Pagination/Pagination';
import { useEffect } from 'react';
import { saveScroll } from '../utils/utils';

export default function CharList() {
  const { characters, loading, currentPage } = useOutletContext();

  useEffect(() => {
    const scrollPos = localStorage.getItem('homeScrollPos');
    scrollPos && window.scrollTo(0, scrollPos);
  }, []);

  useEffect(() => {
    document.addEventListener('scroll', saveScroll);
    return () => document.removeEventListener('scroll', saveScroll);
  }, []);

  if (loading) return null;

  return (
    <>
      <section className="characters-box">
        {characters &&
          characters.results.map((char) => (
            <CharCard
              char={char}
              key={char.id}
              link={`/character/${char.id}`}
            />
          ))}
      </section>
      <Pagination
        start={!characters?.info?.prev}
        end={!characters?.info?.next}
        lastPage={characters?.info?.pages}
        currentPage={currentPage}
      />
    </>
  );
}
