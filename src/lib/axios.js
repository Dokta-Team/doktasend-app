import axios from 'axios';

// const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5200/api/v1';
const baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://api.doktasend.com/api/v1';
export const DOKTA_SEND_ACCESS_TOKEN = 'DOKTA_SEND_ACCESS_TOKEN'

const api = axios.create({
  baseURL,
  withCredentials: true,
});


// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem(DOKTA_SEND_ACCESS_TOKEN);
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });


// api.interceptors.request.use(
//   (config) => {
//     config.headers.Accept = `application/json`;
//     return config;
//   },
//   (error) => {
//     if (typeof window !== 'undefined' && error.response?.status === 401) {
//       window.location.href = '/auth/login'; 
//     }
//     return Promise.reject(error)
//   }
// );


// if (typeof window !== "undefined") {
//   api.interceptors.request.use(
//     (config) => {
//       config.headers.Accept = "application/json";
//       return config;
//     },
//     (error) => Promise.reject(error)
//   );

//   api.interceptors.response.use(
//     (response) => response,
//     (error) => {
//       if (error.response?.status === 401) {
//         window.location.href = "/auth/login"; // ✅ Will only run client-side
//       }
//       return Promise.reject(error);
//     }
//   );
// }
export default api;
