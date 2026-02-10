import React, { useState } from 'react';
import { Movie } from '../types';
import { Link } from 'react-router-dom';
import { Star, Clock } from 'lucide-react';

interface HomeProps {
  movies: Movie[];
}

const Home: React.FC<HomeProps> = ({ movies }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="mb-12 bg-gradient-to-r from-slate-800 to-slate-900 p-8 rounded-2xl border border-slate-700 shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome to BehzadMovie</h1>
          <p className="text-slate-400 text-lg">Experience the ultimate cinema management and booking system.</p>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      </div>

      {/* Grid */}
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <FilmIcon /> Now Showing
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-slate-800 rounded-xl overflow-hidden shadow-lg border border-slate-700 hover:border-cyan-500/50 transition-all hover:transform hover:-translate-y-1 group">
            <div className="relative aspect-[2/3] overflow-hidden">
              <img src={movie.poster_url} alt={movie.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                <span className="text-xs font-bold text-white">{movie.rating}</span>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-bold text-white mb-1 truncate">{movie.title}</h3>
              <p className="text-slate-400 text-sm mb-3">{movie.genre}</p>
              
              <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{movie.duration_minutes}m</span>
                </div>
              </div>

              <Link 
                to={`/book/${movie.id}`}
                className="block w-full text-center bg-slate-700 hover:bg-cyan-500 hover:text-white text-slate-200 py-2 rounded-lg transition-colors text-sm font-medium"
              >
                Book Tickets
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const FilmIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 3v18"/><path d="M3 7.5h4"/><path d="M3 12h18"/><path d="M3 16.5h4"/><path d="M17 3v18"/><path d="M17 7.5h4"/><path d="M17 16.5h4"/></svg>
)

export default Home;