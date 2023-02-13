import { Link } from 'react-router-dom';
import css from '../NotFoundPage/NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <main>
      <div className={css.wrapper}>
        <img
          src="https://cdn.pixabay.com/photo/2018/01/04/15/51/404-error-3060993_960_720.png"
          alt="Not Found"
          width={300}
        />
        <h2>Page not found</h2>
        <Link className={css.link} to="/">
          To Home Page
        </Link>
      </div>
    </main>
  );
};
export default NotFoundPage;
