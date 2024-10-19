import axios from 'axios';

// Create an Axios instance with default configurations
const axiosInstance = axios.create({
  baseURL: 'https://your-api-url.com', // Default base URL, adjust as needed
  timeout: 10000, // Default timeout of 10 seconds
  headers: {
    'Content-Type': 'application/json', // Default Content-Type
    // 'Authorization': 'Bearer your-token' // Uncomment and replace with a token if needed
  },
  params: {}, // Default empty params object, can be customized per request
  withCredentials: false, // Default is false; set to true if you need to include credentials
  responseType: 'json', // Default response type, can be changed to 'blob', 'text', etc.
  maxRedirects: 5, // Default number of redirects to follow
  validateStatus: (status) => status >= 200 && status < 300, // Default to resolve only 2xx status codes
  transformRequest: [
    (data, headers) => {
      // Default transform request; modify request data if needed
      return JSON.stringify(data); // Ensures data is sent as JSON
    },
  ],
  transformResponse: [
    (data) => {
      // Default transform response; parse JSON data
      try {
        return JSON.parse(data);
      } catch (error) {
        return data; // Return data as-is if it's not JSON
      }
    },
  ],
  proxy: false, // Default is no proxy; configure if needed
  auth: null, // Set auth credentials if HTTP Basic Auth is required
  maxContentLength: 2000 * 1000, // Default maximum content length (2MB)
  maxBodyLength: 2000 * 1000, // Default maximum body length (2MB)
  cancelToken: null, // Default is no cancel token; configure for request cancellation
});

// Add request interceptor to modify requests before they are sent
axiosInstance.interceptors.request.use(
  (config) => {
    // Modify the request config before sending
    // e.g., add a token to headers if needed
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Add response interceptor to handle responses and errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Centralized error handling logic
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout:', error.message);
    } else if (error.response) {
      console.error('Server error:', error.response.status, error.response.data);
    } else {
      console.error('Network error:', error.message);
    }
    return Promise.reject(error); // Re-throw the error for further handling if necessary
  }
);

export default axiosInstance;
