import apiServiceInstance from "../../../infrastructure/axios/apiServiceInstance";

class UserWalletService {
  constructor() {
    if (Meteor.isDevelopment) {
      this.url = 'http://localhost:3000/api/v1/customers/';
    } else {
      this.url = 'https://app.ritapos.com/api/v1/customers/';
    }
  }

  async getCustomer(userId) {
    const endpoint = `${this.url}${userId}`
    return apiServiceInstance.get(endpoint);
  }

  async increaseStampCount(userId, amount) {
    const endpoint = `${this.url}${userId}/increase-stamp-count`
    return apiServiceInstance.put(endpoint, {amount});
  }
}

export const userWalletService = new UserWalletService();
