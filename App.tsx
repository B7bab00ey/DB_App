import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import BookingPage from './pages/Booking';
import SchemaDesign from './pages/SchemaDesign';
import AdminSQL from './pages/AdminSQL';
import { INITIAL_MOVIES, INITIAL_HALLS, INITIAL_SHOWTIMES, INITIAL_BOOKINGS } from './services/mockData';
import { Booking } from './types';

const App: React.FC = () => {
  // Global App State acting as Database
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  // In a real app, we'd have state setters for movies/halls too, but they are static for this demo
  const movies = INITIAL_MOVIES;
  const halls = INITIAL_HALLS;
  const showtimes = INITIAL_SHOWTIMES;

  const handleAddBooking = (newBooking: Booking) => {
    setBookings(prev => [...prev, newBooking]);
  };

  return (
    <Router>
      <div className="min-h-screen bg-slate-900 text-slate-200">
        <Navbar />
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<Home movies={movies} />} />
            <Route 
              path="/book/:id" 
              element={
                <BookingPage 
                  movies={movies} 
                  showtimes={showtimes} 
                  halls={halls} 
                  bookings={bookings} 
                  addBooking={handleAddBooking} 
                />
              } 
            />
            <Route path="/schema" element={<SchemaDesign />} />
            <Route 
              path="/admin" 
              element={
                <AdminSQL 
                  data={{ movies, halls, showtimes, bookings }} 
                />
              } 
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
