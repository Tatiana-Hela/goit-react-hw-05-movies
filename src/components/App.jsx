import { Routes, Route } from 'react-router-dom';

import HomePage from './Pages/HomePage/HomePage';
import MoviesPage from './Pages/MoviesPage/MoviesPage';
import MoviesDetailsPage from './Pages/MovieDetailsPage/MovieDetailsPage';

import Menu from './Menu/Menu';

function App() {
  return (
    <div>
      <Menu />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movieId" element={<MoviesDetailsPage />} />
      </Routes>
    </div>
  );
}
export default App;
