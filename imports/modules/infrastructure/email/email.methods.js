import {createMethod} from "meteor/jam:method";
import {simpleEmailSchema} from "./schemas/simpleEmailSchema";
import {Email} from "meteor/email";
import {DEFAULT_FROM_EMAIL} from "./enums/default";
import {Log} from "meteor/logging";

export const sendSimpleEmail = createMethod({
  name: 'email.sendSimpleEmail',
  schema: simpleEmailSchema,
  open: true,
  serverOnly: true,
  async run({to, subject, message}) {
    return Email.sendAsync({
      to,
      from: DEFAULT_FROM_EMAIL,
      subject,
      text: message
    }).catch((error) => {
      Log.error(error);
    });
  }
});
