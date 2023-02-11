import { useState, useEffect } from 'react';
import {
  useParams,
  useLocation,
  useNavigate,
  Link,
  Outlet,
} from 'react-router-dom';
import { getMoviesDetails } from '../../Api/movies';

import css from '../MovieDetailsPage/MovieDetailsPage.module.css';

const MoviesDetailsPage = () => {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/movies';

  useEffect(() => {
    const fetchMoviesDetails = async () => {
      try {
        setLoading(true);
        const result = await getMoviesDetails(Number(movieId));
        // console.log(result);
        setMovie(result);
      } catch (error) {
        setError(error.massage);
      } finally {
        setLoading(false);
      }
    };
    fetchMoviesDetails();
  }, [movieId]);

  const goBack = () => navigate(from);
  return (
    <>
      <button className={css.goBack} onClick={goBack}>
        Go back
      </button>
      {movie && (
        <>
          {loading && <p>...Movies loading</p>}
          {error && <p>...Movies load failed</p>}
          <div className={css.card}>
            <img
              src={
                movie.poster_path
                  ? 'https://image.tmdb.org/t/p/w500' + movie.poster_path
                  : 'https://ik.imagekit.io/tc8jxffbcvf/default-movie-portrait_EmJUj9Tda5wa.jpg?tr=fo-auto,di-'
              }
              alt={movie.title}
              width={300}
            />
            <div className={css.info}>
              <h2>
                {movie.title ? movie.title : 'There is no title yet'} (
                {new Date(movie.release_date).getFullYear()})
              </h2>
              <p>User Score: {movie.vote_average.toFixed(1)}</p>
              <h3>Overview</h3>
              <p>{movie.overview}</p>
              <h3>Genres</h3>
              <p>{movie.genres.map(genre => genre.name).join(', ')}</p>
            </div>
          </div>
          <div>
            <p>Additional information</p>
            <ul>
              <li>
                <Link state={{ from }} to={`/movies/${movieId}/cast`}>
                  Cast
                </Link>
              </li>
              <li>
                <Link state={{ from }} to={`/movies/${movieId}/reviews`}>
                  Reviews
                </Link>
              </li>
            </ul>
            <Outlet />
          </div>
        </>
      )}
    </>
  );
};
export default MoviesDetailsPage;
