import { createContext, useState, useEffect } from 'react';
import axiosInstance, { BASE_URL, refreshAxiosInstance } from '../api/axiosInstance';
import { getAccessToken, setAccessToken } from '../api/tokenStorage';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState('');
    const [accessToken, setLocalAccessToken] = useState(getAccessToken());  // Manage access token as state
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = async () => {
            setLoading(true);
            try {
                const response = await axios.post(`${BASE_URL}/auth/token/refresh/`, {}, { withCredentials: true });
                setAccessToken(response.data.access);
                setLocalAccessToken(response.data.access);
            } catch (error) {
                console.log(error);
                setAccessToken('');
                setLocalAccessToken('');
            } finally {
                setLoading(false);
            }
        };

        initializeAuth();
    }, []);  // Remove accessToken from dependencies

    return (
        <AuthContext.Provider value={{ loading, user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};
