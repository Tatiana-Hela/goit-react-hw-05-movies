import TrendingMovies from 'components/TrendingMovies/TrendingMovies';

import css from '../HomePage/HomePage.module.css';

const HomePage = () => {
  return (
    <main>
      <div>
        <h2 className={css.title}>Trending today</h2>
        <TrendingMovies />
      </div>
    </main>
  );
};
export default HomePage;
