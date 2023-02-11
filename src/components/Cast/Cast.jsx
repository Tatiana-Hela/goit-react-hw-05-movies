import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMoviesCast } from '../Api/movies';

import css from '../Cast/Cast.module.css';

const Cast = () => {
  const [actors, setActors] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { movieId } = useParams();

  useEffect(() => {
    const fetchMoviesDetails = async () => {
      try {
        setLoading(true);
        const result = await getMoviesCast(Number(movieId));
        console.log(result);
        setActors(result);
      } catch (error) {
        setError(error.massage);
      } finally {
        setLoading(false);
      }
    };
    fetchMoviesDetails();
  }, [movieId]);

  return (
    <>
      {loading && <p>...Movies loading</p>}
      {error && <p>...Movies load failed</p>}
      <ul className={css.list}>
        {actors.map(({ id, name, profile_path, character }) => (
          <li key={id} className={css.item}>
            <img
              src={
                profile_path
                  ? 'https://image.tmdb.org/t/p/w500' + profile_path
                  : 'https://ik.imagekit.io/tc8jxffbcvf/default-movie-portrait_EmJUj9Tda5wa.jpg?tr=fo-auto,di-'
              }
              alt={name}
              width={100}
            />
            <p className={css.name}>{name}</p>
            <p>Character: {character}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Cast;
