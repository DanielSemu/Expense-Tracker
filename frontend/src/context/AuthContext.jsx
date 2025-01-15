import { createContext, useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(true);  // Add loading state to handle async behavior

    useEffect(() => {
        const initializeAuth = async () => {
            try {
              
                // Make an API call to check if the user is authenticated
                const response = await axiosInstance.get('/auth/profile'); // Assume backend provides this endpoint
                console.log(response);
                
                setUser(response.data.username);
            } catch (error) {
                setUser('');
            } finally {
                setLoading(false); // Set loading to false when check is done
            }
        };

        initializeAuth();
    }, []);

    // Handle loading state while checking authentication
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{ setLoading,user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};
