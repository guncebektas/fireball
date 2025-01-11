import {createMethod} from 'meteor/jam:method'; // can import { Methods } from 'meteor/jam:method' instead and use Methods.create if you prefer
import {userProfileService} from "./userProfileService.js";
import {fileIdSchema} from "./schemas/fileId";
import {profileDetails} from "./schemas/profileDetails";
import {profileOtp} from "./schemas/profileOtp";
import {profilePreferences} from "./schemas/profilePreferences";
import {USER_PROFILES_METHOD} from "./enums/method";
import {profileBillingDetails} from "./schemas/profileBillingDetails";

export const userProfilesMethods = {
  updateDetails: createMethod({
    name: USER_PROFILES_METHOD.UPDATE_DETAILS,
    schema: profileDetails,
    async run({firstname, lastname, gender, phoneNumber}) {
      return userProfileService.edit(this.userId, {firstname, lastname, gender, phoneNumber});
    }
  }),

  updatePreferences: createMethod({
    name: USER_PROFILES_METHOD.UPDATE_PREFERENCES,
    schema: profilePreferences,
    async run({theme}) {
      return userProfileService.edit(this.userId, {theme});
    }
  }),

  updateBillingDetails: createMethod({
    name: USER_PROFILES_METHOD.UPDATE_BILLING_DETAILS,
    schema: profileBillingDetails,
    async run({firstname, lastname, email, address, city, postalCode, country}) {
      return userProfileService.edit(this.userId, {firstname, lastname, email, address, city, postalCode, country});
    }
  }),

  saveOtp: createMethod({
    name: USER_PROFILES_METHOD.SAVE_OTP,
    schema: profileOtp,
    async run({otp}) {
      return userProfileService.saveOtp(this.userId, otp);
    }
  }),

  saveProfilePicture: createMethod({
    name: USER_PROFILES_METHOD.SAVE_PROFILE_PICTURE,
    schema: fileIdSchema,
    serverOnly: true,
    open: true,
    async run({ fileId }) {
      return userProfileService.saveProfilePictureId(fileId);
    }
  })
}
