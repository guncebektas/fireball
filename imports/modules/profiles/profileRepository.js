import {BaseRepository} from "../shared/repository/baseRepository.js";
import {Profiles} from "./database/profiles.js";

class ProfileRepository extends BaseRepository {
  constructor() {
    super(Profiles);
  }
}

export const profileRepository = new ProfileRepository();
