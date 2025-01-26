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
export const addCategory = async (formData)=>{
    try {
        const response=await axiosInstance.post('/api/category/ ',formData)
        return response.data
    } catch (error) {
        console.error('submission Error', error)
        throw error
    }
}

export const editCategory = async (id,formData)=>{
    try {
        const response=await axiosInstance.put(`/api/category/${id}/`,formData)
        return response.data
    } catch (error) {
        console.error('submission Error', error)

        throw error
    }
}


