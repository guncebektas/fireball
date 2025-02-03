import ApiServiceInstance from "../../infrastructure/axios/apiServiceInstance";

class FranchiseService extends ApiServiceInstance {
  constructor() {
    super();

    this.url = `${this.baseUrl}/api/v1/franchises/`;
  }

  async getMembers(guid) {
    const endpoint = `${this.url}${guid}/stores?isActive=true&isShownInRewarita=true`
    return this.get(endpoint);
  }
}

export const franchiseService = new FranchiseService();
