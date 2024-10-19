import {BaseService} from "../../../shared/service/baseService";
import {Accounts} from "meteor/accounts-base";
import {Log} from "meteor/logging";

class UserService extends BaseService {
  constructor(repository) {
    super(repository);
  }

  async resetPassword(token, password) {
    await Accounts.resetPassword(token, password, (error, response) => {
      console.log(error);
      console.log(response);
    })
  }

  async setPassword(userId, password) {
    await Accounts.setPasswordAsync(userId, password)
      .catch(error => {
        Log.error(error);
      });
  }
}

export const userService = new UserService(Meteor.users)
