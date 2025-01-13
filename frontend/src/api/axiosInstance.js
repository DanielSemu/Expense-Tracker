import axios from 'axios'
import { getAccessToken, setAccessToken } from './tokenStorage'
import { refreshToken } from './auth';
export const BASE_URL = 'http://localhost:8000';



const axiosInstance = axios.create({
    baseURL:BASE_URL,
    withCredentials:true
})

axiosInstance.interceptors.request.use(config =>{
    const token=getAccessToken()
    if (token) {
        config.headers.Authorization= `Bearer ${token}`
    }
    return config
})

axiosInstance.interceptors.response.use(
    response=>response, 
    async error =>{
        const originalRequest= error.config
        if (error.response?.status ===401 && !originalRequest._retry) {
            originalRequest._retry=true
            try {
                const newAccessToken= await refreshToken()
                setAccessToken(newAccessToken)
                originalRequest.headers.Authorization=`Bearer${newAccessToken}`
                return axiosInstance(originalRequest)
            } catch (error) {
                window.location.href='/login'
            }
        }
        return Promise.reject(error)
    }
)

export default axiosInstance