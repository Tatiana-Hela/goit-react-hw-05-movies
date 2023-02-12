import css from '../Error/Error.module.css';

const Error = () => {
  return (
    <h3 className={css.error}>
      Oops...Something went wrong, reload the page or try again later!
    </h3>
  );
};

export default Error;
