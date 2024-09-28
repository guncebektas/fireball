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
    return this.repository.insertAsync({_id});
  }

  async edit(userId, firstname, lastname, phoneNumber) {
    return this.repository.updateAsync({
      _id: userId
    }, {
      $set: {
        firstname,
        lastname,
        phoneNumber
      }
    });
  }

  async saveOtp(userId, otp) {
    return this.repository.updateAsync({
      _id: userId
    }, {
      $set: {
        otp
      }
    });
  }

  async saveProfilePictureId(fileId) {
    return this.repository.updateAsync({
      _id: userId
    }, {
      $set: {
        profilePictureId: fileId
      }
    });
  }
}

export const userProfileService = new UserProfileService({
  repository: userProfileRepository
});
