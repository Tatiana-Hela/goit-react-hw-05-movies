import { useState, useEffect } from 'react';

import MoviesList from 'components/MoviesList/MoviesList';

import { getMoviesTrending } from 'components/Api/movies';

const TrendingMovies = () => {
  const [state, setState] = useState({
    movies: [],
    loading: false,
    error: null,
  });

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setState(prevState => ({
          ...prevState,
          loading: true,
          error: null,
        }));

        const result = await getMoviesTrending();
        setState(prevState => {
          return {
            ...prevState,
            movies: [...prevState.movies, ...result],
          };
        });
      } catch (error) {
        setState(prevState => ({
          ...prevState,
          error,
        }));
      } finally {
        setState(prevState => {
          return {
            ...prevState,
            loading: false,
          };
        });
      }
    };

    fetchMovies();
  }, [setState]);

  const { movies, loading, error } = state;
  return (
    <div>
      {movies.length > 0 && <MoviesList movies={movies} />}
      {loading && <p>...Movies loading</p>}
      {error && <p>...Movies load failed</p>}
    </div>
  );
};
export default TrendingMovies;
