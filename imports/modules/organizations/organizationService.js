import {BaseService} from "../shared/service/baseService";
import {organizationRepository} from "./organizationRepository";

class OrganizationService extends BaseService{
  constructor(repository) {
    super();

    this.repository = repository
  }

  async create(userId) {
    await this.repository.insertAsync({_id: userId});
  }

  async addKey() {

  }

  async removeKey(key) {

  }
}

export const organizationService = new OrganizationService(organizationRepository)

