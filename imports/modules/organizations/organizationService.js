import {BaseService} from "../shared/service/baseService";
import {organizationRepository} from "./organizationRepository";
import {isOrganizationEnabled} from "../shared/functions/isOrganizationEnabled";

class OrganizationService extends BaseService{
  constructor({repository, isFeatureEnabled}) {
    super({ repository, isFeatureEnabled });
  }

  async create(userId) {
   await this.repository.insertAsync({_id: userId});
  }

  async addKey() {

  }

  async removeKey(key) {

  }
}

export const organizationService = new OrganizationService({
  repository: organizationRepository,
  isFeatureEnabled: isOrganizationEnabled,
})

