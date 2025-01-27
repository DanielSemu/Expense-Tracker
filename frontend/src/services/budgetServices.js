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

export const addBudget = async (formData)=>{
    try {
        const response=await axiosInstance.post('/api/budget/ ',formData)
        return response.data
    } catch (error) {
        console.error('submission Error', error)

        throw error
    }
}
export const editBudget = async (id,formData)=>{
    try {
        const response=await axiosInstance.put(`/api/budget/${id}/`,formData)
        return response.data
    } catch (error) {
        console.error('submission Error', error)

        throw error
    }
}
