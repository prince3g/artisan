import axios from 'axios';

const baseURL = import.meta.env.VITE_DJANGO_HOSTNAME; // Replace with your backend URL

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor to Add Token to Headers
api.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor to Handle Expired Tokens
api.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;

    // If token expired and a refresh token exists
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent retry loop
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        const response = await axios.post(`${baseURL}/api/token/refresh/`, { refresh: refreshToken });

        if (response.status === 200) {
          localStorage.setItem('access_token', response.data.access);
          // Update the Authorization header with the new token
          api.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
          // Retry the original request with the new token
          return api(originalRequest);
        }
      } catch (err) {
        console.error('Refresh token failed', err);
        // Optionally redirect to login
        window.location.href = '/login'; 
      }
    }
    return Promise.reject(error);
  }
);

export default api;
