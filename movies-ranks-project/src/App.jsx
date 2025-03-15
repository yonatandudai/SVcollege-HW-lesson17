import React,{useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import HomePage from './pages/HomePage'
import AddMovie from './pages/AddMovie';
import Search from './pages/Search';
import Delete from './pages/Delete';
import { MovieProvider } from './contexts/MovieContext';

function App() {

  return (
    <MovieProvider>
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add-movie" element={<AddMovie />} />
          <Route path="/search" element={<Search />} />
          <Route path="/delete" element={<Delete />} />
        </Routes>
      </div>
    </Router>
    </MovieProvider>
  );
}

export default App
