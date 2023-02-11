import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { getMoviesDetails } from '../../Api/movies';

import css from '../MovieDetailsPage/MovieDetailsPage.module.css';

const MoviesDetailsPage = () => {
  const [movie, setMovie] = useState({});
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

  const { posterPath, releaseDate, title, overview, voteAverage } = movie;
  // const genre = genres.map(genre => genre.name).join(', ');
  console.log(movie);
  return (
    <>
      <button className={css.goBack} onClick={goBack}>
        Go back
      </button>
      <div className={css.card}>
        <img
          src={
            posterPath
              ? 'https://image.tmdb.org/t/p/w500' + posterPath
              : 'https://ik.imagekit.io/tc8jxffbcvf/default-movie-portrait_EmJUj9Tda5wa.jpg?tr=fo-auto,di-'
          }
          alt={title}
          width={300}
        />
        <div className={css.info}>
          <h2>
            {title ? title : 'There is no title yet'} (
            {new Date(releaseDate).getFullYear()})
          </h2>
          <p>User Score: {voteAverage}</p>
          <h3>Overview</h3>
          <p>{overview}</p>
          <h3>Genres</h3>
          <p>{}</p>
        </div>
      </div>
      {loading && <p>...Movies loading</p>}
      {error && <p>...Movies load failed</p>}
    </>
  );
};
export default MoviesDetailsPage;
