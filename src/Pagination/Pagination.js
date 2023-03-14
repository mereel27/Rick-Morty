import { useOutletContext } from 'react-router-dom';
import ArrowIcon from '../Icons/ArrowIcon';

export default function Pagination({ start, end, lastPage, currentPage }) {
  const { changePage } = useOutletContext();
  return (
    <div className="pagination">
      <button
        className="pagination__button pagination__button--prev"
        onClick={() => changePage('prev')}
        disabled={start}
      >
        <ArrowIcon />
      </button>
      <button
        className="pagination__button pagination__button--first"
        onClick={() => changePage('first')}
        disabled={start}
      >
        1
      </button>

      <div className="pagination__current">{currentPage}</div>

      <button
        className="pagination__button pagination__button--last"
        onClick={() => changePage('last')}
        disabled={end}
      >
        {lastPage}
      </button>
      <button
        className="pagination__button pagination__button--next"
        onClick={() => changePage('next')}
        disabled={end}
      >
        <ArrowIcon right />
      </button>
    </div>
  );
}
