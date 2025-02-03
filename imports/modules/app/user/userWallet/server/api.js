import {AxiosExampleContract} from "../../../../infrastructure/axios/axiosExample.contract";
import {ApiService} from "../../../../infrastructure/axios/apiService";

const apiBaseUrl = Meteor.settings.public.app.remoteServiceUrls.ritapos;

const contractRegistry = [
  { pattern: `${apiBaseUrl}/api/v1/customers/*`, contract: AxiosExampleContract },
];

// Create an instance of ApiService with the pattern-based contract configuration
const userWalletServiceInstance = new ApiService(contractRegistry);

export default userWalletServiceInstance;
