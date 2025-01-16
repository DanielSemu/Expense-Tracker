import { createContext, useState, useEffect } from 'react';
import  { BASE_URL} from '../api/axiosInstance';
import { setAccessToken } from '../api/tokenStorage';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeAuth = async () => {
            setLoading(true);
            try {
                const response = await axios.post(`${BASE_URL}/auth/token/refresh/`, {}, { withCredentials: true });
                setAccessToken(response.data.access);
            } catch (error) {
                console.log(error);
                setAccessToken('');
                setLoading(false);
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
