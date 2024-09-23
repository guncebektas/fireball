import {BaseRepository} from "../shared/repository/baseRepository.js";
import {UserProfiles} from "./database/userProfiles.js";

class UserProfileRepository extends BaseRepository {
  constructor() {
    super(UserProfiles);
  }
}

export const userProfileRepository = new UserProfileRepository();
