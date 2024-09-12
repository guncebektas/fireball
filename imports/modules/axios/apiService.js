import axios from './axiosConfig';
import { ZodError } from 'zod';

export class ApiService {
  constructor(contractRegistry = []) {
    this.contractRegistry = contractRegistry;
  }

  // Public method to perform a GET request
  async get(url, params = {}, config = {}) {
    try {
      const response = await axios.get(url, { params, ...config });
      return this._validateResponse(url, response);
    } catch (error) {
      this._handleError(error);
    }
  }

  // Public method to perform a POST request
  async post(url, data = {}, config = {}) {
    try {
      const response = await axios.post(url, data, config);
      return this._validateResponse(url, response);
    } catch (error) {
      this._handleError(error);
    }
  }

  // Additional methods (PUT, DELETE, etc.) would be similarly structured

  // Private method to validate the response based on the contract for the given URL
  _validateResponse(url, response) {
    const contract = this._findContract(url);

    // If no contract is found, return the raw response data without validation
    if (!contract) {
      return response.data;
    }

    try {
      // Parse and validate the response using the specified contract
      const parsedResponse = contract.parse({
        status: response.status.toString(),
        data: response.data,
      });
      return parsedResponse;
    } catch (validationError) {
      if (validationError instanceof ZodError) {
        console.error('Response validation failed:', validationError.errors);
        throw new Error('Invalid response structure');
      }
      throw validationError;
    }
  }

  // Private method to find the contract based on URL patterns
  _findContract(url) {
    for (const { pattern, contract } of this.contractRegistry) {
      const regexPattern = new RegExp(`^${pattern.replace(/\*/g, '.*')}$`);
      if (regexPattern.test(url)) {
        return contract;
      }
    }
    return null; // Return null if no matching contract is found
  }

  // Private method for handling errors
  _handleError(error) {
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout:', error.message);
    } else if (error.response) {
      console.error('Server error:', error.response.status, error.response.data);
    } else {
      console.error('Network error:', error.message);
    }
    throw error; // Re-throw the error for further handling if necessary
  }
}
