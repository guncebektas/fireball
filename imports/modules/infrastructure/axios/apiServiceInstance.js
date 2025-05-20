import {AxiosExampleContract} from "./axiosExample.contract";
import {ApiService} from "./apiService";

export default class ApiServiceInstance extends ApiService {
  constructor() {
    const apiBaseUrl = Meteor.settings.public.app.remoteServiceUrls.ritapos;

    const contractRegistry = [
      // { pattern: `${apiBaseUrl}/api/v1/customers/*`, contract: AxiosExampleContract },
      // { pattern: `https://app.ritapos.com/api/v1/franchises/*`, contract: AxiosExampleContract },
      { pattern: `${apiBaseUrl}/api/v1/orders/*`, contract: AxiosExampleContract },
      { pattern: `${apiBaseUrl}/api/v1/stores/*`, contract: AxiosExampleContract },
    ];

    super(contractRegistry);

    // this is for remoteService of app.ritapos
    this.baseUrl = apiBaseUrl;

    if (Meteor.isDevelopment) {
      this.baseUrl = 'http://localhost:3000';
    }
  }
}

export const apiServiceInstance = new ApiService();
