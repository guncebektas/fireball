import {createMethod} from "meteor/jam:method";
import {userSetPasswordSchema} from "./schemas/userSetPasswordSchema";
import {userService} from "./userService";
import {z} from "zod";
import {Accounts} from "meteor/accounts-base";
import {sendSimpleEmail} from "../../../infrastructure/email/email.methods";
import {userResetPasswordSchema} from "./schemas/userResetPasswordSchema";

export const userSendResetPasswordEmail = createMethod({
  name: 'users.sendResetPasswordEmail',
  schema: z.object({
    email: z.string()
  }),
  open: true,
  serverOnly: true,
  async run({email}) {
    const providedUser = await Accounts.findUserByEmail(email);

    const {token} = await Accounts.generateResetToken(providedUser._id, email, 'resetPassword');
    let url = await Accounts.urls.resetPassword(token);
    url = url.replace('/#/', '/');

    await sendSimpleEmail({
      to: email,
      subject: 'Reset password',
      message: url
    });

    /* XXX: Not working
    await Accounts.sendResetPasswordEmail({
      email
    }).then(response => {
      Log.info(response);
    }).catch(error => {
      Log.error(error);
    });
    */
  }
});

export const userResetPassword = createMethod({
  name: 'users.resetPassword',
  schema: userResetPasswordSchema,
  open: true,
  async run({token, password}) {
    return userService.resetPassword(token, password);
  }
});

export const userSetPassword = createMethod({
  name: 'users.setPassword',
  schema: userSetPasswordSchema,
  serverOnly: true,
  async run({userId, password}) {
    return userService.setPassword(userId, password);
  }
});
