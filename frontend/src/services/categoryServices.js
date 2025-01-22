// import axiosInstance from "../api/axiosInstance";

import axiosInstance from "../api/axiosInstance";

export const getCategory = async ()=>{
    try {
        const response=await axiosInstance.get('/api/category/')
        return response.data    
    } catch (error) {
        console.error("error while fetching",error)
        throw error    
    }
    
}

