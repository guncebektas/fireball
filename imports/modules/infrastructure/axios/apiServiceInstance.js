import {AxiosExampleContract} from "./axiosExample.contract";
import {ApiService} from "./apiService";

export default class ApiServiceInstance extends ApiService {
  constructor() {
    const contractRegistry = [
      { pattern: 'https://app.ritapos.com/api/v1/customers/*', contract: AxiosExampleContract },
      { pattern: 'https://app.ritapos.com/api/v1/franchises/*', contract: AxiosExampleContract },
      { pattern: 'https://app.ritapos.com/api/v1/orders/*', contract: AxiosExampleContract },
      { pattern: 'https://app.ritapos.com/api/v1/stores/*', contract: AxiosExampleContract },
    ];

    super(contractRegistry);

    if (Meteor.isDevelopment) {
      this.baseUrl = 'http://localhost:3000/';
      // this.baseUrl = 'https://app.ritapos.com/';
    } else {
      this.baseUrl = 'https://app.ritapos.com/';
    }
  }
}

export const apiServiceInstance = new ApiService();
