import axios from "axios";

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.REACT_APP_API_URL || 'http://localhost:8000', // Use environment variable or default to localhost
  timeout: 5000,  // Timeout in case the request takes too long
  headers: {
    'Content-Type': 'application/json'  // Set the Content-Type header for JSON requests
  },
});

// Intercept requests to add the Authorization header if a token exists
axiosInstance.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem('authTokens'))?.access;
  console.log('Token:', token);  // Check the token in the console

  if (token) {
    // Add the token to the Authorization header if available
    config.headers['Authorization'] = `Bearer ${token}`;
  } else {
    console.warn('No token found!');  // Log a warning if no token exists
  }

  return config;  // Return the updated config
}, (error) => {
  return Promise.reject(error);  // Handle request errors
});

export default axiosInstance;
