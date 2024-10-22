import {createMethod} from 'meteor/jam:method'; // can import { Methods } from 'meteor/jam:method' instead and use Methods.create if you prefer
import {userProfileService} from "./userProfileService.js";
import {fileIdSchema} from "./schemas/fileId";
import {profileDetails} from "./schemas/profileDetails";
import {profileOtp} from "./schemas/profileOtp";
import {Log} from "meteor/logging";
import {profilePreferences} from "./schemas/profilePreferences";

export const userProfilesMethods = {
  updateDetails: createMethod({
    name: 'userProfiles.updateDetails',
    schema: profileDetails,
    async run({firstname, lastname, gender, phoneNumber}) {
      return userProfileService.edit(this.userId, {firstname, lastname, gender, phoneNumber});
    }
  }),

  updatePreferences: createMethod({
    name: 'userProfiles.updatePreferences',
    schema: profilePreferences,
    async run({theme}) {
      return userProfileService.edit(this.userId, {theme});
    }
  }),

  saveOtp: createMethod({
    name: 'userProfiles.saveOtp',
    schema: profileOtp,
    async run({otp}) {
      return userProfileService.saveOtp(this.userId, otp);
    }
  }),

  saveProfilePicture: createMethod({
    name: 'userProfiles.saveProfilePicture',
    schema: fileIdSchema,
    serverOnly: true,
    open: true,
    async run({ fileId }) {
      Log.info('userProfiles.saveProfilePicture');
      return userProfileService.saveProfilePictureId(fileId);
    }
  })
}
