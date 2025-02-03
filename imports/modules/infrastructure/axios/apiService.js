import axios from './axiosConfig';
import {ZodError} from 'zod';
import {Log} from "meteor/logging";

export class ApiService {
  constructor(contractRegistry = []) {
    this.contractRegistry = contractRegistry;
  }

  async get(url, params = {}, config = {}) {
    try {
      const response = await axios.get(url, { params, ...config });
      return this._validateResponse(url, response);
    } catch (error) {
      this._handleError(error);
    }
  }
  async post(url, data = {}, config = {}) {
    try {
      const response = await axios.post(url, data, config);
      return this._validateResponse(url, response);
    } catch (error) {
      this._handleError(error);
    }
  }

  async put(url, data = {}, config = {}) {
    try {
      const response = await axios.put(url, data, config);
      return this._validateResponse(url, response);
    } catch (error) {
      this._handleError(error);
    }
  }

  // XXX: Additional methods (PUT, DELETE, etc.) would be similarly structured

  // Private method to validate the response based on the contract for the given URL
  _validateResponse(url, response) {
    const contract = this._findContract(url);

    // If no contract is found, return the raw response data without validation
    if (!contract) {
      Log.debug(`The response has no contract so will return data directly`)
      return response.data;
    }

    try {
      // Parse and validate the response using the specified contract
      return contract.parse(response);
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

  _handleError(error) {
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout:', error.message);
    } else if (error.response) {
      console.error('Server error:', error.response.status, error.response.data);
    } else {
      console.error('Network error:', error.message);
    }

    throw error;
  }
}
