import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL1 || 'http://localhost:5200/api/v1';

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
