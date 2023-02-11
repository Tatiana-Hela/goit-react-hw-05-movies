import TrendingMovies from 'components/TrendingMovies/TrendingMovies';

import css from '../HomePage/HomePage.module.css';

const HomePage = () => {
  return (
    <div>
      <h2 className={css.title}>Trending today</h2>
      <TrendingMovies />
    </div>
  );
};
export default HomePage;
