import {BaseRepository} from "../../../shared/repository/baseRepository";

class UserRoleRepository extends BaseRepository {
  constructor(collection) {
    super(collection);
  }
}

export const userRoleRepository = new UserRoleRepository(Meteor.users);
