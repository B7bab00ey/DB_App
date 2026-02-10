import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Movie, Showtime, Hall, Booking as BookingType } from '../types';
import { Calendar, Monitor, User } from 'lucide-react';

interface BookingProps {
  movies: Movie[];
  showtimes: Showtime[];
  halls: Hall[];
  bookings: BookingType[];
  addBooking: (b: BookingType) => void;
}

const ROWS = ['A', 'B', 'C', 'D', 'E', 'F'];
const SEATS_PER_ROW = 8;

const BookingPage: React.FC<BookingProps> = ({ movies, showtimes, halls, bookings, addBooking }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const movie = movies.find(m => m.id === Number(id));

  // States
  const [selectedShowtimeId, setSelectedShowtimeId] = useState<number | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]); // Format "A-1"
  const [customerName, setCustomerName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [sqlLog, setSqlLog] = useState<string>("");

  // Derived Data
  const movieShowtimes = showtimes.filter(s => s.movie_id === Number(id));
  const selectedShowtime = showtimes.find(s => s.id === selectedShowtimeId);
  const selectedHall = halls.find(h => h.id === selectedShowtime?.hall_id);

  const occupiedSeats = useMemo(() => {
    if (!selectedShowtimeId) return new Set<string>();
    const taken = bookings
      .filter(b => b.showtime_id === selectedShowtimeId && b.status !== 'CANCELLED')
      .map(b => `${b.seat_row}-${b.seat_number}`);
    return new Set(taken);
  }, [bookings, selectedShowtimeId]);

  const toggleSeat = (row: string, num: number) => {
    const seatId = `${row}-${num}`;
    if (occupiedSeats.has(seatId)) return;
    
    setSelectedSeats(prev => 
      prev.includes(seatId) 
        ? prev.filter(s => s !== seatId) 
        : [...prev, seatId]
    );
  };

  const handleBook = () => {
    if (!selectedShowtimeId || !customerName || selectedSeats.length === 0) return;
    setIsProcessing(true);

    // Simulate SQL Transaction
    const timestamp = new Date().toISOString();
    let transactionLog = `-- Transaction Start\nBEGIN;\n`;
    
    selectedSeats.forEach(seat => {
      const [r, n] = seat.split('-');
      const newBooking: BookingType = {
        id: Math.floor(Math.random() * 10000),
        showtime_id: selectedShowtimeId,
        customer_name: customerName,
        seat_row: r,
        seat_number: parseInt(n),
        status: 'CONFIRMED',
        booking_time: timestamp
      };
      
      addBooking(newBooking);
      transactionLog += `INSERT INTO bookings (showtime_id, customer_name, seat_row, seat_number, status, booking_time)\nVALUES (${selectedShowtimeId}, '${customerName}', '${r}', ${n}, 'CONFIRMED', '${timestamp}');\n`;
    });

    transactionLog += `COMMIT;\n-- Transaction End`;
    setSqlLog(transactionLog);

    setTimeout(() => {
      setIsProcessing(false);
      // Reset form or redirect
      alert("Booking Confirmed!");
      setSelectedSeats([]);
      setCustomerName("");
      navigate('/admin'); // Redirect to admin to see the data
    }, 1500);
  };

  if (!movie) return <div className="p-8 text-white">Movie not found</div>;

  return (
    <div className="container mx-auto px-4 py-8 pb-24">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Movie Info & Showtime Selection */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700">
            <img src={movie.poster_url} alt={movie.title} className="w-full h-64 object-cover" />
            <div className="p-6">
              <h1 className="text-2xl font-bold text-white mb-2">{movie.title}</h1>
              <p className="text-slate-400 text-sm mb-4">{movie.description}</p>
              
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-cyan-400" /> Select Showtime
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {movieShowtimes.map(st => (
                  <button
                    key={st.id}
                    onClick={() => { setSelectedShowtimeId(st.id); setSelectedSeats([]); }}
                    className={`p-3 rounded-lg border text-sm text-center transition-all ${
                      selectedShowtimeId === st.id 
                      ? 'bg-cyan-600 border-cyan-500 text-white' 
                      : 'bg-slate-700 border-slate-600 text-slate-300 hover:border-cyan-500/50'
                    }`}
                  >
                    {new Date(st.start_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    <div className="text-xs opacity-75 mt-1">${st.price}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

           {/* SQL Log Simulation */}
           {sqlLog && (
            <div className="bg-slate-900 rounded-xl p-4 border border-slate-700 font-mono text-xs overflow-x-auto animate-fade-in">
              <div className="text-slate-500 mb-2 border-b border-slate-800 pb-1">server_log.sql</div>
              <pre className="text-green-400">{sqlLog}</pre>
            </div>
          )}
        </div>

        {/* Center/Right: Seat Map */}
        <div className="lg:col-span-2">
          {selectedShowtime ? (
            <div className="bg-slate-800 rounded-xl p-8 border border-slate-700 h-full flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white">{selectedHall?.name}</h2>
                  <p className="text-slate-400 text-sm">{selectedHall?.type} Experience</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-cyan-400">
                    ${(selectedSeats.length * selectedShowtime.price).toFixed(2)}
                  </div>
                  <div className="text-xs text-slate-400">{selectedSeats.length} seats selected</div>
                </div>
              </div>

              {/* Screen */}
              <div className="w-full h-2 bg-slate-600 rounded-full mb-1 shadow-[0_10px_20px_-2px_rgba(34,211,238,0.3)]"></div>
              <div className="text-center text-xs text-slate-500 mb-10 flex items-center justify-center gap-2">
                <Monitor className="w-3 h-3" /> SCREEN
              </div>

              {/* Seats */}
              <div className="flex-1 flex flex-col items-center justify-center gap-3">
                {ROWS.map(row => (
                  <div key={row} className="flex gap-3 items-center">
                    <span className="w-4 text-xs text-slate-500 font-mono text-right">{row}</span>
                    {Array.from({ length: SEATS_PER_ROW }).map((_, i) => {
                      const num = i + 1;
                      const seatId = `${row}-${num}`;
                      const isOccupied = occupiedSeats.has(seatId);
                      const isSelected = selectedSeats.includes(seatId);

                      return (
                        <button
                          key={seatId}
                          disabled={isOccupied}
                          onClick={() => toggleSeat(row, num)}
                          className={`
                            w-8 h-8 sm:w-10 sm:h-10 rounded-t-lg rounded-b-md text-xs font-medium transition-all
                            ${isOccupied 
                              ? 'bg-slate-700 text-slate-500 cursor-not-allowed border border-slate-600' 
                              : isSelected 
                                ? 'bg-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.5)] transform -translate-y-1' 
                                : 'bg-slate-600 text-slate-300 hover:bg-slate-500 hover:text-white'
                            }
                          `}
                        >
                          {num}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="flex gap-6 justify-center mt-10 text-xs text-slate-400">
                <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-slate-600"></div> Available</div>
                <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-cyan-500"></div> Selected</div>
                <div className="flex items-center gap-2"><div className="w-4 h-4 rounded bg-slate-700 border border-slate-600"></div> Occupied</div>
              </div>

              {/* Checkout Form */}
              <div className="mt-8 pt-6 border-t border-slate-700">
                <div className="flex gap-4 items-end">
                  <div className="flex-1">
                    <label className="block text-xs font-medium text-slate-400 mb-1">Customer Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                      <input 
                        type="text" 
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-600 rounded-lg pl-10 pr-4 py-2 text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                        placeholder="Enter name for ticket..."
                      />
                    </div>
                  </div>
                  <button 
                    onClick={handleBook}
                    disabled={selectedSeats.length === 0 || !customerName || isProcessing}
                    className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white px-8 py-2 rounded-lg font-bold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {isProcessing ? 'Processing...' : 'Confirm Booking'}
                  </button>
                </div>
              </div>

            </div>
          ) : (
            <div className="h-full flex items-center justify-center bg-slate-800/50 rounded-xl border border-dashed border-slate-700 p-8 text-slate-500">
              Select a showtime to view seat availability
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
