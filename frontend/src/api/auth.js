import axiosInstance from "./axiosInstance";

export const login = async (username,password)=>{
    const response= await axiosInstance.post('/api/token/',{username, password})
    const {accessToken} =response.data
    return accessToken
}

export const refreshToken = async ()=>{
    const response = await axiosInstance.post('/api/token/refresh/')
    return response.data.accessToken
}

export const logout =async ()=>{
    await axiosInstance.post('/logout')
}