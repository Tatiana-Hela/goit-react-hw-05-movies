import { useState, useEffect } from 'react';
import { ThreeDots } from 'react-loader-spinner';

import MoviesList from 'components/MoviesList/MoviesList';
import Error from 'components/Error/Error';

import { getMoviesTrending } from 'Api/movies';

const TrendingMovies = () => {
  const [movies, setMovie] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const result = await getMoviesTrending();
        setMovie(result);
      } catch (error) {
        setError(error.massage);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
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
export default TrendingMovies;
