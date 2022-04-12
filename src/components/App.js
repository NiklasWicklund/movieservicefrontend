
import React from 'react';
import '../styles/App.css';
import Home from '../pages/Home';
import Discover from '../pages/Discover';
import Movie from '../pages/Movie';
import {
  HashRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
function App() {
  return (
    
    <Router>
      <Routes>
        <Route 
          path="/"
          element={<Home />}
        />
        <Route 
          path="discover"
          element={<Discover />}
        />
        <Route 
          path="movie/:id"
          element={<Movie />}
        />
      </Routes>
    </Router>
  )
}

export default App;
