import { useState, useEffect } from 'react';
import {
  useParams,
  useLocation,
  useNavigate,
  Link,
  Outlet,
} from 'react-router-dom';
import Error from 'components/Error/Error';
import { ThreeDots } from 'react-loader-spinner';
import { FaArrowLeft } from 'react-icons/fa';
import { getMoviesDetails } from '../../api/movies';

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
        <FaArrowLeft /> Go back
      </button>
      {movie && (
        <>
          {error && <Error />}
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#FF0000"
            ariaLabel="three-dots-loading"
            wrapperStyle={{ marginLeft: '45%' }}
            visible={loading && true}
          />
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
          <div className={css.wrapper}>
            <h3 className={css.title}>Additional information</h3>
            <ul className={css.list}>
              <li className={css.item}>
                <Link
                  className={css.link}
                  state={{ from }}
                  to={`/movies/${movieId}/cast`}
                >
                  Cast
                </Link>
              </li>
              <li className={css.item}>
                <Link
                  className={css.link}
                  state={{ from }}
                  to={`/movies/${movieId}/reviews`}
                >
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
