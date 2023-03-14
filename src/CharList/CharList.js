import { useOutletContext, useNavigate } from 'react-router-dom';
import CharCard from '../CharCard/CharCard.js';
import Pagination from '../Pagination/Pagination';
import { useEffect } from 'react';
import { saveScroll } from '../utils/utils';

const currentPage = (nextUrl, lastPage) => {
  if (!nextUrl) return lastPage || 0;
  const nextPage = new URL(nextUrl).searchParams.get('page');
  return nextPage ? nextPage - 1 : lastPage || 0;
};

export default function CharList() {
  const { characters, loading } = useOutletContext();
  const navigate = useNavigate();

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
              handleClick={() => navigate(`/character/${char.id}`)}
            />
          ))}
      </section>
      <Pagination
        start={!characters?.info?.prev}
        end={!characters?.info?.next}
        lastPage={characters?.info?.pages}
        currentPage={currentPage(characters?.info?.next, characters?.info?.pages)}
      />
    </>
  );
}
