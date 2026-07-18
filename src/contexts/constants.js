// API URLs
export const RAABTA_API = import.meta.env.VITE_API_URL || 'https://raabta-api.almsoftware.in';

// Environment
export const ENV = import.meta.env.VITE_ENV || 'development';

// Add other constants below
export const APP_NAME = 'Raabta';

// You can add more environment-specific configurations here
export const isProduction = ENV === 'production';
export const isDevelopment = ENV === 'development';

// export const RAABTA_API = 'http://localhost:5273';
