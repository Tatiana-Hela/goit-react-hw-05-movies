import { Link, useLocation } from 'react-router-dom';

const MoviesList = ({ movies }) => {
  const location = useLocation();
  return (
    <ul>
      {movies.map(({ id, original_title, name }) => (
        <li key={id}>
          {original_title ? (
            <Link state={{ from: location }} to={`/movies/${id}`}>
              {original_title}
            </Link>
          ) : (
            <Link state={{ from: location }} to={`/movies/${id}`}>
              {name}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
};
export default MoviesList;

MoviesList.defaultProps = {
  items: [],
};
