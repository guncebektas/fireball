import {BaseService} from "../shared/service/baseService";
import {Accounts} from "meteor/accounts-base";

class UserService extends BaseService {
  constructor(repository) {
    super(repository);
  }

  async resetPassword(userId, password) {
    console.log('resetPassword');
    console.log(userId);
    console.log(password);

    await Accounts.setPasswordAsync(userId, password)
      .catch(error => {
        console.log(error);
      });
  }
}

export const userService = new UserService(Meteor.users)
