export interface Movie {
  id: number;
  title: string;
  genre: string;
  duration_minutes: number;
  rating: string;
  poster_url: string;
  description: string;
}

export interface Hall {
  id: number;
  name: string;
  capacity: number;
  type: 'Standard' | 'IMAX' | 'VIP';
}

export interface Showtime {
  id: number;
  movie_id: number;
  hall_id: number;
  start_time: string; // ISO string
  price: number;
}

export interface Booking {
  id: number;
  showtime_id: number;
  customer_name: string;
  seat_row: string;
  seat_number: number;
  status: 'CONFIRMED' | 'PENDING' | 'CANCELLED';
  booking_time: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isSQL?: boolean;
}
