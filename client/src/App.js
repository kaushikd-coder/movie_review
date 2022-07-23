import './App.css';
import Signup from './pages/Signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Movies from './pages/Movies';
import AddMovie from './pages/AddMovie';
import UpdateMovie from './pages/UpdateMovie';
import MovieDetailsPage from './pages/MovieDetailsPage';
import AddReview from './pages/AddReview';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />

        <Route path="/movies" element={<Movies />} />
        <Route path="/add" element={<AddMovie />} />
        <Route path="/update/:id" element={<UpdateMovie />} />
        <Route path="/details/:id" element={<MovieDetailsPage />} />
        <Route path="/reviews/add/:id" element={<AddReview />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
