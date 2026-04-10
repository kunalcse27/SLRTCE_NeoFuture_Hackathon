import axios from 'axios';

/**
 * Base API Service
 * 
 * Configure your backend URL here.
 * For local development, this usually points to http://localhost:5000/api or similar.
 */
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor (e.g., for adding Auth tokens)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor (e.g., for handling global errors)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthenticated etc.
    if (error.response?.status === 401) {
      console.warn('Unauthorized access - redirecting to login');
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
