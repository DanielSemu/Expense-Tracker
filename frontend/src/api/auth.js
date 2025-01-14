import axiosInstance from "./axiosInstance";

export const login = async (username,password)=>{
    const response= await axiosInstance.post('/auth/token/',{username, password})
    const {access} =response.data
    return access
}

let isRefreshing = false; 
let refreshSubscribers = []; 

export const refreshToken = async () => {
  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      refreshSubscribers.push({ resolve, reject });
    });
  }

  try {
    isRefreshing = true; 
    const response = await axiosInstance.post('/auth/token/refresh/');
    const {newAccessToken} = response.data.access;
    // Once the new token is obtained, resolve all queued requests
    refreshSubscribers.forEach(({ resolve }) => resolve(newAccessToken));
    refreshSubscribers = []; // Clear the queue

    return response;
  } catch (error) {
    // Handle the error, e.g., unauthorized error (401)
    if (error.response && error.response.status === 401) {
      refreshSubscribers.forEach(({ reject }) => reject(error));
      refreshSubscribers = [];
    }

    throw error; // Propagate the error for further handling
  } finally {
    isRefreshing = false; // Reset the flag once the refresh process is completed
  }
};


export const logout =async ()=>{
    await axiosInstance.post('/logout')
}