import ApiServiceInstance from "../../../infrastructure/axios/apiServiceInstance";

class UserWalletService extends ApiServiceInstance{
  constructor() {
    super();

    this.url = `${this.baseUrl}/api/v1/customers/`;
  }

  async getCustomer(userId) {
    const endpoint = `${this.url}${userId}`
    return this.get(endpoint);
  }

  async increaseStampCount(userId, amount) {
    const endpoint = `${this.url}${userId}/increase-stamp-count`
    return this.put(endpoint, {amount});
  }
}

export const userWalletService = new UserWalletService();
