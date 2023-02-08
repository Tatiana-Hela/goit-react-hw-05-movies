import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SearchMovies from 'components/SearchMovies/SearchMovies';

import { getSearchMovies } from 'components/Api/movies';

const MoviesPage = () => {
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!search) {
      return;
    }
    const fetchSearchMovies = async () => {
      try {
        setLoading(true);
        const data = await getSearchMovies(search);
        if (data.length === 0) {
          toast.error('There are no movies matching your request.');
        }
        setMovies(prevMovies => [...prevMovies, ...data]);
      } catch (error) {
        setError(error.massage);
      } finally {
        setLoading(false);
      }
    };
    fetchSearchMovies();
  }, [search]);

  const searchMovies = ({ query }) => {
    if (query.trim() === '') {
      toast.error('Enter a search term.');
      return;
    }
    if (query === search) {
      toast.info('Same request. Enter a new word.');
      return;
    }
    setMovies([]);
    setSearch(query);
  };

  return (
    <>
      <SearchMovies onSubmit={searchMovies} />
      <ToastContainer position="top-right" autoClose={3000} />
      <ul>
        {movies.map(({ id, original_title }) => {
          return (
            <li key={id}>
              <Link>{original_title}</Link>
            </li>
          );
        })}
        {loading && <p>...Movies loading</p>}
        {error && <p>...Movies load failed</p>}
      </ul>
    </>
  );
};
export default MoviesPage;
