import axios from './axiosConfig'; // Import the configured axios instance

class ApiService {
  // Method to perform GET requests
  static async get(url, params = {}, config = {}) {
    try {
      const response = await axios.get(url, { params, ...config });
      return response.data;
    } catch (error) {
      ApiService.handleError(error);
    }
  }

  // Method to perform POST requests
  static async post(url, data = {}, config = {}) {
    try {
      const response = await axios.post(url, data, config);
      return response.data;
    } catch (error) {
      ApiService.handleError(error);
    }
  }

  // Method to perform PUT requests
  static async put(url, data = {}, config = {}) {
    try {
      const response = await axios.put(url, data, config);
      return response.data;
    } catch (error) {
      ApiService.handleError(error);
    }
  }

  // Method to perform DELETE requests
  static async delete(url, config = {}) {
    try {
      const response = await axios.delete(url, config);
      return response.data;
    } catch (error) {
      ApiService.handleError(error);
    }
  }

  // Method to handle errors
  static handleError(error) {
    // Centralized error handling logic
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout:', error.message);
    } else if (error.response) {
      console.error(
        'Server error:',
        error.response.status,
        error.response.data
      );
    } else {
      console.error('Network error:', error.message);
    }

    // Optionally throw or return error to be handled by the caller
    throw error;
  }
}

export default ApiService;
