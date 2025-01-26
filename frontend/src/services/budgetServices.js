import axiosInstance from "../api/axiosInstance"

export const getBudgets = async ()=>{
    try {
        const response=await axiosInstance.get('/api/budget/')
        return response.data    
    } catch (error) {
        console.error("error while fetching",error)
        throw error    
    }
    
}