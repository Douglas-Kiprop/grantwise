import axios from 'axios';

const api = axios.create({
  // Temporarily force production URL
  baseURL: 'https://grantwise.onrender.com/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to log the URL being used
api.interceptors.request.use(request => {
  console.log('API Request URL:', request.baseURL + request.url);
  return request;
});

// Add an interceptor to log errors
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data || error.message);
    throw error;
  }
);

export default api;