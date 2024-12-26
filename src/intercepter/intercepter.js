import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5050/api',  // Replace with your Node.js backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor - Add token to each request
apiClient.interceptors.request.use(
  (config) => {
    // Get the token from localStorage or wherever you're storing it
    const token = localStorage.getItem('authToken');
    
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Add token to the Authorization header
    }

    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Response Interceptor - Handle responses globally
apiClient.interceptors.response.use(
  (response) => {
    // Modify response if needed before returning
    return response;
  },
  (error) => {
    // Handle error globally, e.g., redirect on 401 Unauthorized
    if (error.response && error.response.status === 401) {
      // Handle Unauthorized error (maybe redirect to login)
      console.log('Unauthorized access. Redirecting to login...');
      // You can also redirect to the login page or perform other actions
    }
    return Promise.reject(error);
  }
);

export default apiClient;
