
import axiosInstance from "../api/axiosInstance";

export const getIncome = async ()=>{
    try {
        const response=await axiosInstance.get('/api/incomes/')
        return response.data    
    } catch (error) {
        console.error("error while fetching",error)
        throw error    
    }
    
}
export const addIncome = async (formData)=>{
    try {
        const response=await axiosInstance.post('/api/incomes/ ',formData)
        return response.data
    } catch (error) {
        console.error('submission Error', error)

        throw error
    }
}