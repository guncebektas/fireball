import {createMethod} from "meteor/jam:method";
import {userProfileService} from "../userProfiles/userProfileService";

export const userResetPassword = createMethod({
  name: 'users.resetPassword',
  schema: userResetPassword,
  async run({firstname, lastname, gender, phoneNumber}) {
    return userProfileService.edit(this.userId, {firstname, lastname, gender, phoneNumber});
  }
});
