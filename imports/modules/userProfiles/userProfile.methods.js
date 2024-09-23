import {createMethod} from 'meteor/jam:method'; // can import { Methods } from 'meteor/jam:method' instead and use Methods.create if you prefer
import {z} from "zod";
import {userProfileService} from "./userProfileService.js";

export const profileUpdate = createMethod({
  name: 'profile.update',
  schema: z.object({firstname: z.string(), lastname: z.string()}),
  async run({firstname, lastname}) {
    return userProfileService.edit(this.userId, firstname, lastname);
  }
});
