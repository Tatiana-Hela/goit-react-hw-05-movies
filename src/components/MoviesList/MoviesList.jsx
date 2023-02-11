import { Link, useLocation } from 'react-router-dom';

import css from '../MoviesList/MoviesList.module.css';

const MoviesList = ({ movies }) => {
  const location = useLocation();
  return (
    <ul>
      {movies.map(({ id, title }) => (
        <li className={css.list} key={id}>
          <Link
            className={css.link}
            state={{ from: location }}
            to={`/movies/${id}`}
          >
            {title}
          </Link>
        </li>
      ))}
    </ul>
  );
};
export default MoviesList;

MoviesList.defaultProps = {
  items: [],
};
