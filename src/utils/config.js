// Application Configuration

export const config = {

  // App Info

  appName: import.meta.env.VITE_APP_NAME || 'WonderTrip',

  appUrl: import.meta.env.VITE_APP_URL || 'http://localhost:3000',

  

  // API Configuration

  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',

  apiKey: import.meta.env.VITE_API_KEY || '',

  

  // Feature Flags

  features: {

    enableBooking: import.meta.env.VITE_ENABLE_BOOKING === 'true',

    enableReviews: import.meta.env.VITE_ENABLE_REVIEWS === 'true',

  },

  

  // Third Party Services

  googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',

  stripePublicKey: import.meta.env.VITE_STRIPE_PUBLIC_KEY || '',

  

  // Analytics

  gaTrackingId: import.meta.env.VITE_GA_TRACKING_ID || '',

  

  // Pagination

  itemsPerPage: 12,

  

  // Date Formats

  dateFormat: 'MMM DD, YYYY',

  dateTimeFormat: 'MMM DD, YYYY HH:mm',

};



export default config;
