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

  async edit(userId, firstname, lastname, gender, phoneNumber) {
    return this.repository.updateAsync({
      _id: userId
    }, {
      $set: {
        firstname,
        lastname,
        gender,
        phoneNumber
      }
    });
  }

  async saveOtp(userId, otp) {
    return this.repository.updateAsync({
      _id: userId
    }, {
      $set: {
        otp,
        otpAt: new Date()
      }
    });
  }

  async getByOtp(otp) {
    const date = new Date();
    date.setMinutes(date.getMinutes() - 1);

    return this.repository.findOneAsync({
      otp,
      otpAt: {
        $gte: date
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

  async updatePayload(userId, payload) {
    return this.repository.updateAsync({
      _id: userId
    }, {
      $set: payload
    });
  }
}

export const userProfileService = new UserProfileService({
  repository: userProfileRepository
});
