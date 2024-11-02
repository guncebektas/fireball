import ApiServiceInstance from "../../infrastructure/axios/apiServiceInstance";

class StoreService extends ApiServiceInstance {
  constructor() {
    super();

    this.url = `${this.baseUrl}api/v1/stores/`;
  }
}

export const storeService = new StoreService();
