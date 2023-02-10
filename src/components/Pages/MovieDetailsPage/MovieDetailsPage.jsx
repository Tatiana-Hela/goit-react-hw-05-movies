import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { getMoviesDetails } from '../../Api/movies';

const MoviesDetailsPage = () => {
  const [movie, setMovies] = useState(null);
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
        console.log(result);
        setMovies(result);
      } catch (error) {
        setError(error.massage);
      } finally {
        setLoading(false);
      }
    };
    fetchMoviesDetails();
  }, [movieId]);

  console.log(movie);
  const goBack = () => navigate(from);

  return (
    <>
      <button onClick={goBack}>Go back</button>
      <div>
        <img src="" alt={movie.title} />
        <h2>
          {movie.title} ({movie.releaseDate})
        </h2>
        <p>User Score: {movie.voteAverage.toFixed(1)}</p>
        <h3>Overview</h3>
        <p>{movie.overview}</p>
        <h3>Genres</h3>
        <p>{movie.genres.map(genre => genre.name).join(', ')}</p>
      </div>
    </>
  );
};
export default MoviesDetailsPage;
