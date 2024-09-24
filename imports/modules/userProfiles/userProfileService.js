import {BaseService} from "../shared/service/baseService.js";
import {userProfileRepository} from "./userProfileRepository.js";

class UserProfileService extends BaseService {
  constructor({repository}) {
    super({repository});
  }
  /**
   * @param _id {string}
   * @return {Promise<string>}
   */
  async create(_id) {
    return userProfileRepository.insertAsync({_id});
  }

  async edit(userId, firstname, lastname) {
    return userProfileRepository.updateAsync({
      _id: userId
    }, {
      $set: {
        firstname,
        lastname
      }
    });
  }

  async saveOtp(userId, otp) {
    return userProfileRepository.updateAsync({
      _id: userId
    }, {
      $set: {
        otp
      }
    });
  }
}

export const userProfileService = new UserProfileService({
  repository: userProfileRepository
});
