import { createContext,useContext,useState,useEffect } from "react";

import { getAccessToken,setAccessToken } from "../api/tokenStorage";
import { refreshToken } from "../api/auth";

const AuthContext=createContext()

export const AuthProvider =({children})=>{
    const [user, setUser]=useState('')
    useEffect(()=>{
        const initializeAuth = async ()=>{
            try {
                const response= await refreshToken()
                setAccessToken(response.data.access)
                setUser(response.data.username)
            } catch (error) {
                setUser('')
            }
        } 

        initializeAuth()
    },[])
    return <AuthContext.Provider value={{user,setUser}}>{children}</AuthContext.Provider>
}

export const useAuthContext = ()=>useContext(AuthContext)