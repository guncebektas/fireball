import {createMethod} from 'meteor/jam:method'; // can import { Methods } from 'meteor/jam:method' instead and use Methods.create if you prefer
import {userProfileService} from "./userProfileService.js";
import {fileIdSchema} from "./schemas/fileId";
import {profileDetails} from "./schemas/profileDetails";
import {profileOtp} from "./schemas/profileOtp";

export const profileUpdate = createMethod({
  name: 'profile.update',
  schema: profileDetails,
  async run({firstname, lastname}) {
    return userProfileService.edit(this.userId, firstname, lastname);
  }
});

export const profileSaveOtp = createMethod({
  name: 'profile.saveOtp',
  schema: profileOtp,
  async run({otp}) {
    return userProfileService.saveOtp(this.userId, otp);
  }
});

export const profileSetProfilePicture = createMethod({
  name: 'profile.setProfilePicture',
  schema: fileIdSchema,
  async run({ fileId }) {
    return userProfileService.saveProfilePictureId(this.userId, fileId);
  }
});
