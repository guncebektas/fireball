import {createMethod} from "meteor/jam:method";
import {userResetPasswordSchema} from "./schemas/userResetPassword";
import {userService} from "./userService";

export const userResetPassword = createMethod({
  name: 'users.resetPassword',
  schema: userResetPasswordSchema,
  serverOnly: true,
  async run({userId, password}) {
    return userService.resetPassword(userId, password);
  }
});
