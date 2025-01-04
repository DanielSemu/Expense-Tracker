import React, { useState, useEffect, createContext, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { getProfile, login } from "../services/authServices";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
    );

    const navigate = useNavigate();

    const loginUser = async (username, password) => {
        try {
            
            const data = await login(username, password);
            setAuthTokens(data);
            localStorage.setItem('authTokens', JSON.stringify(data));
            const user =await getProfile()
            // console.log(user);
            setUser(user);
            navigate('/dashboard');
        } catch (error) {
            alert('Invalid credentials');
        }
    };

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
        navigate('/login');
    };

    useEffect(() => {
        if (authTokens && authTokens.access) {
          try {
            const decodedToken = JSON.parse(atob(authTokens.access.split('.')[1]));
            setUser(decodedToken);
          } catch (error) {
            console.error('Error decoding token:', error);
          }
        }
      }, [authTokens]);
      

    return (
        <AuthContext.Provider value={{ user, loginUser, logoutUser, authTokens }}>
            {children}
        </AuthContext.Provider>
    );
};
