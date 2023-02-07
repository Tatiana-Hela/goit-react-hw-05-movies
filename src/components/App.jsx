import { Routes, Route } from 'react-router-dom';

import HomePage from './Pages/HomePage/HomePage';
import MoviesPage from './Pages/MoviesPage/MoviesPage';

import Menu from './Menu/Menu';

function App() {
  return (
    <div>
      <Menu />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage/>} />
      </Routes>
    </div>
  );
}
export default App;
