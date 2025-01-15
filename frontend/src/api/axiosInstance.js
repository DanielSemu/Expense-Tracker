import axios from 'axios';
import { getAccessToken, setAccessToken } from './tokenStorage';
import { refreshToken } from './auth';
export const BASE_URL = 'http://localhost:8000';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,  // This ensures cookies are sent with each request
});

// Request interceptor to include the access token in headers
axiosInstance.interceptors.request.use((config) => {
    const token = getAccessToken();
    console.log("token is",token);
    
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response interceptor to refresh token on 401 error (token expiry)
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                // Refresh the token
                const newAccessToken = await refreshToken();
                setAccessToken(newAccessToken);
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                // If refresh fails, redirect to login
                window.location.href = '/';
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
