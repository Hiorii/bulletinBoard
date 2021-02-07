export const API_URL = (process.env.NODE_ENV === 'production') ? '/api' : 'http://localhost:8000/api';
export const GOOGLE_URL = (process.env.NODE_ENV === 'production') ? '/auth' : 'http://localhost:8000/auth';
