import axiosInstance from "../api/axiosInstance";

export const login = async (username, password)=>{
    try {
        const response=await axiosInstance.post('/api/token/',{
            username,
            password,
        })
        return response.data
    } catch (error) {
        console.error('Login failed ', error)

        throw error
    }
}

// Fetch current user profile (example for protected API)
export const getProfile = async () => {
    try {
      const response = await axiosInstance.get('/auth/profile/');
      return response.data;
    } catch (error) {
      console.error('Fetching profile failed', error);
      throw error;
    }
  };