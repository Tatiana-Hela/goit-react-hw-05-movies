import { useState } from 'react';
import PropTypes from 'prop-types';
import { GrSearch } from 'react-icons/gr';
import css from '../SearchMovies/SearchMovies.module.css';

const INITIAL_STATE = {
  query: '',
};
const SearchMovies = ({ onSubmit }) => {
  const [state, setState] = useState({ ...INITIAL_STATE });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ ...state });
    setState({ ...INITIAL_STATE });
  };

  const { query } = state;

  return (
    <div>
      <form className={css.form} onSubmit={handleSubmit}>
        <label className={css.label}>
          <input
            className={css.input}
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Search movies"
            name="query"
            autoComplete="off"
            autoFocus
          />
          <button className={css.button} type="submit">
            <GrSearch />
            Search
          </button>
        </label>
      </form>
    </div>
  );
};
export default SearchMovies;

SearchMovies.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
