import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
  const elements = movies.map(({ id, original_title, name }) => {
    return (
      <li key={id}>
        {original_title ? <Link>{original_title}</Link> : <Link>{name}</Link>}
      </li>
    );
  });
  console.log(movies);
  return (
    <div>
      <ul>{elements}</ul>
      {loading && <p>...Movies posts</p>}
      {error && <p>...Movies load failed</p>}
    </div>
  );
};
export default TrendingMovies;
