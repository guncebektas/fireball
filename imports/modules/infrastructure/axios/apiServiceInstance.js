import {AxiosExampleContract} from "./axiosExample.contract";
import {ApiService} from "./apiService";

// Define contract patterns
const contractRegistry = [
  { pattern: 'https://app.ritapos.com/api/v1/orders/*', contract: AxiosExampleContract },
  { pattern: 'https://app.ritapos.com/api/v1/customers/*', contract: AxiosExampleContract },
];

// Create an instance of ApiService with the pattern-based contract configuration
const apiServiceInstance = new ApiService(contractRegistry);

export default apiServiceInstance;
