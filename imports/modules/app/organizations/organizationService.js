import {organizationRepository} from "./organizationRepository";
import {isOrganizationEnabled} from "../../shared/functions/isOrganizationEnabled";
import {BaseService} from "../../shared/service/baseService";

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

