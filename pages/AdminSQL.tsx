import React, { useState } from 'react';
import { Movie, Hall, Showtime, Booking } from '../types';
import { Database, Play } from 'lucide-react';

interface AdminProps {
  data: {
    movies: Movie[];
    halls: Hall[];
    showtimes: Showtime[];
    bookings: Booking[];
  }
}

type TableName = 'movies' | 'halls' | 'showtimes' | 'bookings';

const AdminSQL: React.FC<AdminProps> = ({ data }) => {
  const [activeTable, setActiveTable] = useState<TableName>('movies');

  const renderTable = () => {
    let columns: string[] = [];
    let rows: any[] = [];

    switch (activeTable) {
      case 'movies':
        rows = data.movies;
        columns = ['id', 'title', 'genre', 'duration', 'rating'];
        break;
      case 'halls':
        rows = data.halls;
        columns = ['id', 'name', 'capacity', 'type'];
        break;
      case 'showtimes':
        rows = data.showtimes;
        columns = ['id', 'movie_id', 'hall_id', 'start_time', 'price'];
        break;
      case 'bookings':
        rows = data.bookings;
        columns = ['id', 'showtime_id', 'customer_name', 'seat_row', 'seat_number', 'status'];
        break;
    }

    return (
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-300">
          <thead className="bg-slate-700 text-xs uppercase font-medium text-slate-400">
            <tr>
              {columns.map(col => <th key={col} className="px-6 py-3">{col}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {rows.map((row: any) => (
              <tr key={row.id} className="hover:bg-slate-800/50">
                {columns.map(col => (
                  <td key={`${row.id}-${col}`} className="px-6 py-4 whitespace-nowrap">
                    {col === 'duration' ? row.duration_minutes : 
                     col.includes('time') ? new Date(row[col] || row.booking_time).toLocaleString() :
                     row[col]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && <div className="p-4 text-center text-slate-500">No data available</div>}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
        <Database className="text-cyan-400" /> Data Explorer
      </h1>

      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden flex flex-col lg:flex-row min-h-[600px]">
        {/* Sidebar */}
        <div className="w-full lg:w-64 bg-slate-900 border-r border-slate-700 p-4">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">Database Tables</h3>
          <div className="space-y-1">
            {(['movies', 'halls', 'showtimes', 'bookings'] as TableName[]).map(table => (
              <button
                key={table}
                onClick={() => setActiveTable(table)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors flex justify-between items-center ${
                  activeTable === table ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {table}
                <span className="text-xs opacity-50 bg-black/20 px-1.5 py-0.5 rounded">
                  {data[table].length}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-8 pt-8 border-t border-slate-800">
             <div className="bg-slate-800/50 p-3 rounded border border-slate-700">
               <div className="flex items-center gap-2 text-xs text-green-400 font-mono mb-2">
                 <Play className="w-3 h-3" /> Status: Connected
               </div>
               <p className="text-[10px] text-slate-500">
                 Read-only access via React Context.
                 Changes in Booking Page update these tables in real-time.
               </p>
             </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b border-slate-700 bg-slate-800 flex justify-between items-center">
            <div className="font-mono text-sm text-cyan-300">SELECT * FROM {activeTable};</div>
          </div>
          <div className="flex-1 bg-slate-900/50">
            {renderTable()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSQL;
