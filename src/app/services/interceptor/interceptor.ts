import axios from 'axios';

const interceptorInstance = axios.create({
  baseURL: 'https://localhost:8088/',  // Replace with your API base URL
});

interceptorInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');  // Retrieve token from localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;  // Attach the token to request headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);  // Handle request error
  }
);

export default interceptorInstance;
