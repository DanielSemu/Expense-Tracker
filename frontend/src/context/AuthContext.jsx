import { createContext,useContext,useState,useEffect } from "react";

import { getAccessToken,setAccessToken } from "../api/tokenStorage";
import { refreshToken } from "../api/auth";

const AuthContext=createContext()

export const AuthProvider =({children})=>{
    const [user, setUser]=useState(null)
    useEffect(()=>{
        const initializeAuth = async ()=>{
            try {
                const token= await refreshToken()
                setAccessToken(token)
                setUser({})
            } catch (error) {
                setUser(null)
            }
        } 

        initializeAuth()
    },[])
    return <AuthContext.Provider value={{user,setUser}}>{children}</AuthContext.Provider>
}

export const useAuthContext = ()=>useContext(AuthContext)