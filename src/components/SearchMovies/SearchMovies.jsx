import { useState } from 'react';

import PropTypes from 'prop-types';
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
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Search movies"
            name="query"
            autoComplete="off"
            autoFocus
          />
          <button type="submit">Search</button>
        </label>
      </form>
    </div>
  );
};
export default SearchMovies;

SearchMovies.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
