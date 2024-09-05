import {BaseService} from "../shared/service/baseService.js";
import {profileRepository} from "./profileRepository.js";

class ProfileService extends BaseService {
  /**
   * @param _id {string}
   * @return {Promise<string>}
   */
  async create(_id) {
    return profileRepository.insertAsync({_id});
  }

  async edit(userId, firstname, lastname) {
    return profileRepository.updateAsync({
      _id: userId
    }, {
      $set: {
        firstname,
        lastname
      }
    });
  }
}

export const profileService = new ProfileService();
