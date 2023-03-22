import './App.scss';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/karla/700.css';

import { useGoogleLogin, googleLogout } from '@react-oauth/google';
import { useCallback, useEffect, useState } from 'react';
import {
  Outlet,
  useMatch,
  useLoaderData,
  useSearchParams,
  Link,
} from 'react-router-dom';

import logo from './assets/img/logo.png';
import Profile from './Profile/Profile';
import SearchBar from './SearchBar/SearchBar';
import { sortByName, getNameQuery } from './utils/utils';
import NotFound from './ErrorMessage/NotFound';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import SkeletonList from './SkeletonList/SkeletonList';

function App() {
  const isSingleCharacter = useMatch('/character/*');
  const [searchParams, setSearchParams] = useSearchParams();
  const [characters, setCharacters] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(useLoaderData() || null);
  const [searchValue, setSearchValue] = useState(
    getNameQuery(searchParams) || ''
  );
  const [error, setError] = useState(null);

  const login = useGoogleLogin({
    onSuccess: (response) => {
      const token = response.access_token;
      fetch(`/api/userInfo?token=${token}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw response;
        })
        .then((data) => {
          localStorage.setItem('access_token', token);
          setProfile(data);
        })
        .catch((error) => console.log(error));
    },
  });

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setProfile(null);
    googleLogout();
  };

  const fetchData = (url) => {
    setLoading(true);
    fetch(url)
      .then((response) => {
        if (response.ok) {
          setError(null);
          return response.json();
        }
        throw response;
      })
      .then((data) =>
        setCharacters({ ...data, results: sortByName(data.results) })
      )
      .catch((error) => {
        setError(error);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    !isSingleCharacter &&
      fetchData(
        `https://rickandmortyapi.com/api/character/?${searchParams.toString()}`
      );
  }, [searchParams, isSingleCharacter]);

  const handleSearchInputChange = useCallback(({ target: { value } }) => {
    setSearchValue(value);
    const params = value ? { name: value } : null;
    setSearchParams(params || {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClear = useCallback(() => {
    setSearchValue('');
    setSearchParams({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changePage = (direction = 'first') => {
    const nameValue = searchParams.get('name');
    const nameParams = nameValue && { name: nameValue };
    if (direction === 'first') {
      characters?.info?.prev && setSearchParams({ page: 1, ...nameParams });
      return;
    }
    if (direction === 'last') {
      const lastPage = characters?.info?.pages;
      lastPage && setSearchParams({ page: lastPage, ...nameParams });
      return;
    }
    const link = characters?.info?.[direction];
    const newPage = new URL(link).searchParams.get('page');
    link && setSearchParams({ page: newPage, ...nameParams });
  };

  return (
    <>
      {!isSingleCharacter && (
        <header>
          <div className="container">
            <Profile
              profile={profile}
              handleClick={profile ? handleLogout : login}
            />
            <Link to="/">
              <img
                className="logo"
                src={logo}
                alt="Rick and Morty characters"
                width="600"
                height="200"
              />
            </Link>
            <SearchBar
              value={searchValue}
              handleChange={handleSearchInputChange}
              handleClear={handleClear}
            />
          </div>
        </header>
      )}
      <main>
        <div className="container">
          {loading && !isSingleCharacter && (
            <SkeletonList length={characters?.results?.length} />
          )}

          {!error && <Outlet context={{ characters, changePage, loading }} />}

          {!loading && searchValue && error && <NotFound />}

          {!loading && !searchValue && error && <ErrorMessage error={error} />}
        </div>
      </main>
    </>
  );
}

export default App;

export const profileLoader = async () => {
  const localToken = localStorage.getItem('access_token');
  if (localToken) {
    const response = await fetch(`/api/userInfo?token=${localToken}`);
    if (!response.ok) {
      localStorage.removeItem('access_token');
      return null;
    }
    return response.json();
  }
  return null;
};
