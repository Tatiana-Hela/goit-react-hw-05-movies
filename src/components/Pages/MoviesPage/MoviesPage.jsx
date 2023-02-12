import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThreeDots } from 'react-loader-spinner';

import MoviesList from 'components/MoviesList/MoviesList';
import SearchMovies from 'components/SearchMovies/SearchMovies';
import Error from 'components/Error/Error';
import { getSearchMovies } from 'components/Api/movies';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');

  useEffect(() => {
    if (!query) {
      return;
    }
    const fetchSearchMovies = async () => {
      try {
        setLoading(true);
        const data = await getSearchMovies(query);
        // console.log(data);
        if (data.length === 0) {
          toast.error('There are no movies matching your request.');
        }
        setMovies(data);
      } catch (error) {
        setError(error.massage);
      } finally {
        setLoading(false);
      }
    };
    fetchSearchMovies();
  }, [query]);

  const searchMovies = ({ query }) => {
    if (query.trim() === '') {
      toast.error('Enter a search term.');
    }
    setMovies([]);
    setSearchParams({ query });
  };

  return (
    <div>
      <SearchMovies onSubmit={searchMovies} />
      <ToastContainer position="top-right" autoClose={3000} />
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#FF0000"
        ariaLabel="three-dots-loading"
        wrapperStyle={{ marginLeft: '45%' }}
        visible={loading && true}
      />
      {error && <Error />}
      {movies.length > 0 && <MoviesList movies={movies} />}
    </div>
  );
};
export default MoviesPage;
