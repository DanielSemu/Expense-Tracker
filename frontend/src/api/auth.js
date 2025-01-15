import axiosInstance from './axiosInstance';
import { setAccessToken } from './tokenStorage';


let isRefreshing = false;
let refreshSubscribers = [];  // Queue of requests that are waiting for a refreshed token

// Login function: Handles user login and sets the access token in storage
export const login = async (username, password) => {
    const response = await axiosInstance.post('/auth/token/', { username, password });
    const { access } = response.data;  // Destructure access token from the response
    setAccessToken(access);  // Save token locally
    return access;
};

// Token refresh logic
export const refreshToken = async () => {
    if (isRefreshing) {
        return new Promise((resolve, reject) => {
            refreshSubscribers.push({ resolve, reject });
        });
    }

    try {
        isRefreshing = true;
        const response = await axiosInstance.post('/auth/token/refresh/');
        const newAccessToken = response.data.access;  // Get new access token from the response
        setAccessToken(newAccessToken);  // Save new access token

        // Resolve all queued requests
        refreshSubscribers.forEach(({ resolve }) => resolve(newAccessToken));
        refreshSubscribers = [];  // Clear the queue

        return newAccessToken;  // Return new access token
    } catch (error) {
        // Handle error (e.g., token refresh failed)
        refreshSubscribers.forEach(({ reject }) => reject(error));
        refreshSubscribers = [];
        throw error;  // Propagate error
    } finally {
        isRefreshing = false;  // Reset the refresh flag
    }
};

export const logout =async ()=>{
    await axiosInstance.post('/logout')
}