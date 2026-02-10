import { Movie, Hall, Showtime, Booking } from '../types';

export const INITIAL_MOVIES: Movie[] = [
  {
    id: 1,
    title: "Inception",
    genre: "Sci-Fi",
    duration_minutes: 148,
    rating: "PG-13",
    poster_url: "https://www.originalfilmart.com/cdn/shop/files/inception_2010_advance_original_film_art_f4801a23-edb3-4db0-b382-1e2aec1dc927_5000x.jpg?v=1715962948",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O."
  },
  {
    id: 2,
    title: "The Dark Knight",
    genre: "Action",
    duration_minutes: 152,
    rating: "PG-13",
    poster_url: "https://m.media-amazon.com/images/I/51rF2-tvXVL._AC_UF894,1000_QL80_.jpg",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice."
  },
  {
    id: 3,
    title: "Interstellar",
    genre: "Sci-Fi",
    duration_minutes: 169,
    rating: "PG-13",
    poster_url: "https://i.ebayimg.com/images/g/m88AAOSwtC1gr5ry/s-l1200.jpg",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival."
  },
  {
    id: 4,
    title: "Parasite",
    genre: "Thriller",
    duration_minutes: 132,
    rating: "R",
    poster_url: "https://m.media-amazon.com/images/I/91KArYP03YL._AC_UF894,1000_QL80_.jpg",
    description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan."
  }
];

export const INITIAL_HALLS: Hall[] = [
  { id: 1, name: "Hall A (IMAX)", capacity: 50, type: 'IMAX' },
  { id: 2, name: "Hall B (Standard)", capacity: 80, type: 'Standard' },
  { id: 3, name: "Hall C (VIP)", capacity: 20, type: 'VIP' },
];

export const INITIAL_SHOWTIMES: Showtime[] = [
  { id: 1, movie_id: 1, hall_id: 1, start_time: new Date(new Date().setHours(14, 0, 0, 0)).toISOString(), price: 15.00 },
  { id: 2, movie_id: 1, hall_id: 1, start_time: new Date(new Date().setHours(18, 0, 0, 0)).toISOString(), price: 18.00 },
  { id: 3, movie_id: 2, hall_id: 2, start_time: new Date(new Date().setHours(16, 30, 0, 0)).toISOString(), price: 12.00 },
  { id: 4, movie_id: 3, hall_id: 1, start_time: new Date(new Date().setHours(21, 0, 0, 0)).toISOString(), price: 15.00 },
  { id: 5, movie_id: 4, hall_id: 3, start_time: new Date(new Date().setHours(19, 0, 0, 0)).toISOString(), price: 25.00 },
];

export const INITIAL_BOOKINGS: Booking[] = [
  { id: 101, showtime_id: 1, customer_name: "John Doe", seat_row: "D", seat_number: 4, status: 'CONFIRMED', booking_time: new Date().toISOString() },
  { id: 102, showtime_id: 1, customer_name: "Jane Smith", seat_row: "D", seat_number: 5, status: 'CONFIRMED', booking_time: new Date().toISOString() },
];
