import axios from 'axios';
import axiosInstance, { BASE_URL, loginAxiosInstance } from './axiosInstance';
import {  setAccessToken } from './tokenStorage';


let isRefreshing = false;
let refreshSubscribers = [];  // Queue of requests that are waiting for a refreshed token

export const registerUser = async (formData) => {
    try {
        const { first_name, last_name, username, email, password } = formData;
        const response = await axios.post(`${BASE_URL}/auth/register/`, {
            first_name, last_name, username, email, password
        });
        return response.data;  // Return success response data
    } catch (error) {
        if (error.response) {
            // Return error message and status code to the caller
            return {
                success: false,
                status: error.response.status,
                message: error.response.data.error || 'Registration failed. Please try again.'
            };
        } else if (error.request) {
            return {
                success: false,
                status: null,
                message: 'No response from server. Please check your network connection.'
            };
        } else {
            return {
                success: false,
                status: null,
                message: 'An unexpected error occurred.'
            };
        }
    }
};

export const login = async (username, password) => {
    try {
        
        const response = await axios.post(
            `${BASE_URL}/auth/token/`, 
            { username, password }, 
            {
                withCredentials: true, // Ensures cookies are sent with the request
            }
        );
        const { access } = response.data;  // Destructure access token from the response
        setAccessToken(access)
        return response;  
    } catch (error) {
        return error.response
    }
};

export const profile = async () => {
    const response = await axiosInstance.get('/auth/profile/');
    return response.data;
};

export const refreshToken = async () => {
    if (isRefreshing) {
        return new Promise((resolve, reject) => {
            refreshSubscribers.push({ resolve, reject });
        });
    }

    isRefreshing = true;
    try {
        const response = await axios.post(`${BASE_URL}/auth/token/refresh/`, {}, { withCredentials: true });
        const newAccessToken = response.data.access;
        setAccessToken(newAccessToken);

        refreshSubscribers.forEach(({ resolve }) => resolve(newAccessToken));
        refreshSubscribers = [];

        return newAccessToken;
    } catch (error) {
        refreshSubscribers.forEach(({ reject }) => reject(error));
        refreshSubscribers = [];
        throw error;
    } finally {
        isRefreshing = false;
    }
};


export const logout =async ()=>{
    const response=await axiosInstance.post('/auth/logout/')
    
    setAccessToken(null)
    return response
}