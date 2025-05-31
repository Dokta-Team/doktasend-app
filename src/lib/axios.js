import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL,
  withCredentials: true,
});

export const DOKTA_ACCESS_TOKEN = 'DOKTA_ACCESS_TOKEN'

// api.interceptors.request.use(
//   (config) => {
//     config.headers.Accept = `application/json`;
//     return config;
//   },
//   (error) => {
//     console.log("INterceptor error", error)
//     if (typeof window !== 'undefined' && error.response?.status === 401) {
//       window.location.href = '/auth/login'; 
//     }
//     return Promise.reject(error)
//   }
// );

export default api;
