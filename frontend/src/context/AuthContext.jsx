import { createContext, useState, useEffect } from 'react';
import axiosInstance, { refreshAxiosInstance } from '../api/axiosInstance';
import { getAccessToken, setAccessToken } from '../api/tokenStorage';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState('');
    const accessToken=getAccessToken()
    const [loading, setLoading] = useState(true);  // Add loading state to handle async behavior

    useEffect(() => {
        const initializeAuth = async () => {
            try {
              
                // Make an API call to check if the user is authenticated
                const response = await axiosInstance.post('/auth/token/refresh/'); // Assume backend provides this endpoint
                
                setAccessToken(response.data.access);
                setLoading(false);
            } catch (error) {
                console.log(error);
                alert('')
                setAccessToken('');
                setLoading(false);
            } finally {
                setLoading(false); // Set loading to false when check is done
            }
        };

        initializeAuth();
    }, [accessToken]);

    // Handle loading state while checking authentication
   
    return (
        <AuthContext.Provider value={{ loading,setLoading,user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};
