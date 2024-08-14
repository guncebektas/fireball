import {createMethod} from 'meteor/jam:method'; // can import { Methods } from 'meteor/jam:method' instead and use Methods.create if you prefer
import {z} from "zod";
import {profileService} from "./profileService.js";

export const profileCreate = createMethod({
  name: 'profile.create',
  schema: z.object({_id: z.string()}),
  async run({_id}) {
    return profileService.create(_id);
  }
});

export const profileUpdate = createMethod({
  name: 'profile.update',
  schema: z.object({firstname: z.string(), lastname: z.string()}),
  async run({firstname, lastname}) {
    return profileService.edit(this.userId, firstname, lastname);
  }
});
