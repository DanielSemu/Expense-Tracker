// import axiosInstance from "../api/axiosInstance";

import axiosInstance from "../api/axiosInstance";

export const getExpenses = async ()=>{
    try {
        const response=await axiosInstance.get('/api/expenses/')
        return response.data    
    } catch (error) {
        console.error("error while fetching",error)
        throw error    
    }
    
}
export const addExpense = async (formData)=>{
    try {
        const response=await axiosInstance.post('/api/expenses/ ',formData)
        return response.data
    } catch (error) {
        console.error('submission Error', error)

        throw error
    }
}
export const editExpense = async (id,formData)=>{
    try {
        const response=await axiosInstance.put(`/api/expenses/${id}/`,formData)
        return response.data
    } catch (error) {
        console.error('submission Error', error)

        throw error
    }
}

// export const login = async (username, password)=>{
//     try {
//         const response=await axiosInstance.post('/api/token/',{
//             username,
//             password,
//         })
//         return response.data
//     } catch (error) {
//         console.error('Login failed ', error)

//         throw error
//     }
// }

// export const login = async (username, password)=>{
//     try {
//         const response=await axiosInstance.post('/api/token/',{
//             username,
//             password,
//         })
//         return response.data
//     } catch (error) {
//         console.error('Login failed ', error)

//         throw error
//     }
// }

// // Fetch current user profile (example for protected API)
// export const getProfile = async () => {
//     try {
//       const response = await axiosInstance.get('/auth/profile/');
//       return response.data;
//     } catch (error) {
//       console.error('Fetching profile failed', error);
//       throw error;
//     }
//   };