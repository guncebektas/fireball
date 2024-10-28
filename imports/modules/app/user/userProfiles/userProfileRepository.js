import {BaseRepository} from "../../../shared/repository/baseRepository";
import {UserProfiles} from "./database/userProfiles.js";

class UserProfileRepository extends BaseRepository {
  constructor(collection) {
    super(collection);
  }
}

export const userProfileRepository = new UserProfileRepository(UserProfiles);
