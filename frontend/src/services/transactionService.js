// import axiosInstance from "../api/axiosInstance";

import axiosInstance from "../api/axiosInstance";

export const getTransaction = async ()=>{
    try {
        const response=await axiosInstance.get('/api/transaction/')
        return response.data    
    } catch (error) {
        console.error("error while fetching",error)
        throw error    
    }
    
}

