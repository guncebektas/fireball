import {BaseService} from "../../../shared/service/baseService";
import {userRoleRepository} from "./userRoleRepository.js";
import {Roles} from "meteor/alanning:roles";
import {ROLE} from "../../../shared/enums/role";
import {ROLE_SCOPE} from "../../../shared/enums/roleScope";

class UserRoleService extends BaseService {
  constructor({repository}) {
    super({repository});
  }

  async setAsManager(userId) {
    await Roles.addUsersToRolesAsync(userId, ROLE.MANAGER, ROLE_SCOPE.USER);
  }
}

export const userRoleService = new UserRoleService({
  repository: userRoleRepository
});
