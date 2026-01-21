// API Endpoints

export const API_ENDPOINTS = {

  AUTH: {

    LOGIN: '/auth/login',

    SIGNUP: '/auth/signup',

    LOGOUT: '/auth/logout',

    REFRESH: '/auth/refresh',

  },

  DESTINATIONS: {

    LIST: '/destinations',

    DETAIL: '/destinations/:id',

    SEARCH: '/destinations/search',

    POPULAR: '/destinations/popular',

  },

  BOOKINGS: {

    CREATE: '/bookings',

    LIST: '/bookings',

    DETAIL: '/bookings/:id',

    CANCEL: '/bookings/:id/cancel',

  },

  USER: {

    PROFILE: '/user/profile',

    UPDATE: '/user/profile',

    BOOKINGS: '/user/bookings',

  },

};



// Navigation Links

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Discover', path: '/discover' },
  { name: 'Destinations', path: '/destinations' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];



// Destination Categories

export const DESTINATION_CATEGORIES = [

  'All',

  'Beach',

  'Mountain',

  'City',

  'Adventure',

  'Cultural',

  'Nature',

  'Luxury',

];



// Price Ranges

export const PRICE_RANGES = [

  { label: 'Budget', min: 0, max: 500 },

  { label: 'Mid-Range', min: 500, max: 1500 },

  { label: 'Luxury', min: 1500, max: 5000 },

  { label: 'Ultra Luxury', min: 5000, max: Infinity },

];



// Booking Status

export const BOOKING_STATUS = {

  PENDING: 'pending',

  CONFIRMED: 'confirmed',

  CANCELLED: 'cancelled',

  COMPLETED: 'completed',

};
