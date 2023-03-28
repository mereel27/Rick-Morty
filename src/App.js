import './App.scss';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/karla/700.css';

import { useGoogleLogin, googleLogout } from '@react-oauth/google';
import { useCallback, useEffect, useState, useRef } from 'react';
import { Outlet, useMatch, useSearchParams, Link, useLocation} from 'react-router-dom';

import logo from './assets/img/logo.png';
import Profile from './Profile/Profile';
import SearchBar from './SearchBar/SearchBar';
import { sortByName, getNameQuery } from './utils/utils';
import NotFound from './ErrorMessage/NotFound';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import SkeletonList from './SkeletonList/SkeletonList';

let timeoutID;

function App() {
  const mounted = useRef(false);
  const mounted2 = useRef(false);
  const isSingleCharacter = useMatch('/character/*');
  const [searchParams, setSearchParams] = useSearchParams();
  const [characters, setCharacters] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(searchParams.get('page') || '1');
  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem('profile')) || null
  );
  const [searchValue, setSearchValue] = useState(
    getNameQuery(searchParams) || ''
  );
  const [error, setError] = useState(null);

  console.log(useLocation())

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
          localStorage.setItem('profile', JSON.stringify(data));
          setProfile(data);
        })
        .catch((error) => console.log(error));
    },
  });

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('profile');
    setProfile(null);
    googleLogout();
  };

  const fetchData = (delay = false) => {
    setLoading(true);
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
      fetch(`https://rickandmortyapi.com/api/character/?${searchParams.toString()}`)
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
    }, delay ? 500 : 0);
  };

  useEffect(() => {
    (async () => {
      const localToken = localStorage.getItem('access_token');
      const profile = localStorage.getItem('profile');
      if (localToken) {
        const response = await fetch(`/api/userInfo?token=${localToken}`);
        if (!response.ok) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('profile');
        }
      } else if (profile) {
        localStorage.removeItem('profile');
      }
    })();
  }, []);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (mounted.current) {
      fetchData(searchValue);
    } else {
      mounted.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  useEffect(() => {
    if (mounted2.current) {
      fetchData();
    } else {
      mounted2.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleSearchInputChange = useCallback(({ target: { value } }) => {
    setSearchValue(value);
    const params = value ? { name: value } : null;
    setSearchParams(params || {});
  }, [setSearchParams]);

  const handleClear = useCallback(() => {
    setSearchValue('');
    setSearchParams({});
  }, [setSearchParams]);

  const changePage = (direction = 'first') => {
    const nameValue = searchParams.get('name');
    const nameParams = nameValue && { name: nameValue };
    let page;
    if (direction === 'first') {
      page = characters?.info?.prev ? 1 : undefined;
    } else if (direction === 'last') {
      page = characters?.info?.pages || undefined;
    } else {
      const link = characters?.info?.[direction];
      const newPage = link ? new URL(link).searchParams.get('page') : null;
      page = newPage || undefined;
    }

    if (page) {
      setSearchParams({ page: page, ...nameParams });
      setPage(page);
    }
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

          {!error && (
            <Outlet
              context={{ characters, changePage, loading, currentPage: page }}
            />
          )}

          {!loading && searchValue && error && <NotFound />}

          {!loading && !searchValue && error && <ErrorMessage error={error} />}
        </div>
      </main>
    </>
  );
}

export default App;
