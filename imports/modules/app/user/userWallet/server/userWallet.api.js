import {AxiosExampleContract} from "../../../../infrastructure/axios/axiosExample.contract";
import {ApiService} from "../../../../infrastructure/axios/apiService";

const contractRegistry = [
  { pattern: 'https://app.ritapos.com/api/v1/customers/*', contract: AxiosExampleContract },
];

// Create an instance of ApiService with the pattern-based contract configuration
const userWalletServiceInstance = new ApiService(contractRegistry);

export default userWalletServiceInstance;
