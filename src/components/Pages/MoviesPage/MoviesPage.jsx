import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import MoviesList from 'components/MoviesList/MoviesList';
import SearchMovies from 'components/SearchMovies/SearchMovies';

import { getSearchMovies } from 'components/Api/movies';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('search');

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

  const searchMovies = ({ search }) => {
    setMovies([]);
    setSearchParams({ search });
  };
  return (
    <div>
      <SearchMovies onSubmit={searchMovies} />
      <ToastContainer position="top-right" autoClose={3000} />
      {movies.length > 0 && <MoviesList movies={movies} />}
      {loading && <p>...Movies loading</p>}
      {error && <p>...Movies load failed</p>}
    </div>
  );
};
export default MoviesPage;
