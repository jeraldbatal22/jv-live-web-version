import axios from 'axios';

export const axiosApiCall = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // 👈 important: sends cookies automatically
});

// Request interceptor
axiosApiCall.interceptors.request.use(
  (config: any) => {
    // Add custom headers if needed
    return config;
  },
  (error: any) => Promise.reject(error)
);

// Response interceptor
axiosApiCall.interceptors.response.use(
  (response: any) => response,
  async (error: any) => {
    if (error.response?.status === 401) {
      // Example: redirect to login or refresh token
      console.warn('Unauthorized, redirecting...');
      // window.location.href = "/login"; // for client-side only
    }
    return Promise.reject(error);
  }
);
