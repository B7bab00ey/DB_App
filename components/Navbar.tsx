import React from 'react';
import { Film, Database, LayoutTemplate, Ticket } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'text-cyan-400 bg-slate-800' : 'text-slate-400 hover:text-cyan-300 hover:bg-slate-800/50';
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-slate-900 border-b border-slate-700 flex items-center justify-between px-6 z-50">
      <div className="flex items-center gap-2">
        <div className="bg-cyan-500 p-2 rounded-lg">
          <Film className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl font-bold text-white tracking-wide">Behzad<span className="text-cyan-400">Movie</span></span>
      </div>

      <div className="flex items-center gap-2">
        <Link to="/" className={`px-4 py-2 rounded-md flex items-center gap-2 transition-colors ${isActive('/')}`}>
          <LayoutTemplate className="w-4 h-4" />
          <span>Movies</span>
        </Link>
        <Link to="/schema" className={`px-4 py-2 rounded-md flex items-center gap-2 transition-colors ${isActive('/schema')}`}>
          <Database className="w-4 h-4" />
          <span>Schema Design</span>
        </Link>
        <Link to="/admin" className={`px-4 py-2 rounded-md flex items-center gap-2 transition-colors ${isActive('/admin')}`}>
          <Ticket className="w-4 h-4" />
          <span>Data Explorer</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;