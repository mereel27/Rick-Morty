import SearchIcon from '../Icons/SearchIcon';
import { MdClear } from 'react-icons/md';
import { memo } from 'react';

export default memo(function SearchBar({ value, handleChange, handleClear }) {
  return (
    <div className="search">
      <SearchIcon />
      <input
        type="text"
        id="search"
        aria-label="search" 
        role="searchbox"
        className="search__input"
        placeholder="Filter by name..."
        value={value}
        onChange={handleChange}
      />
      {value && (
        <button className="search__clear-button" onClick={handleClear}>
          <MdClear />
        </button>
      )}
    </div>
  );
});
