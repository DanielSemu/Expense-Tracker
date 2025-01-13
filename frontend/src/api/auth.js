import axiosInstance from "./axiosInstance";

export const login = async (username,password)=>{
    const response= await axiosInstance.post('/api/token/',{username, password})
    const {access} =response.data
    return access
}

export const refreshToken = async ()=>{
    const response = await axiosInstance.post('/api/token/refresh/')
    return response.data.access
}

export const logout =async ()=>{
    await axiosInstance.post('/logout')
}