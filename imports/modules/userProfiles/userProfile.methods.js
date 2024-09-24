import {createMethod} from 'meteor/jam:method'; // can import { Methods } from 'meteor/jam:method' instead and use Methods.create if you prefer
import {z} from "zod";
import {userProfileService} from "./userProfileService.js";
import {fileUploadSchema} from "./schemas/fileUpload";
import {profileDetails} from "./schemas/profileDetails";
import {Files} from "../shared/database/filesCollection";
import {Log} from "meteor/logging";

export const profileUpdate = createMethod({
  name: 'profile.update',
  schema: profileDetails,
  async run({firstname, lastname}) {
    return userProfileService.edit(this.userId, firstname, lastname);
  }
});

export const profileUploadProfilePicture = createMethod({
  name: 'profile.uploadProfilePicture',
  schema: fileUploadSchema,
  async run({ fileData, name, type }) {
    const uploadInstance = Files.insert({
      file: new File([fileData], name, { type }),
      streams: 'dynamic',
      chunkSize: 'dynamic',
      onStart() {
        Log.info('Upload started');
      },
      onUploaded(error, fileObj) {
        if (error) {
          throw new Meteor.Error('upload-failed', 'Upload failed');
        } else {
          Log.error('File uploaded successfully:', fileObj);
        }
      },
      onError(error) {
        throw new Meteor.Error('upload-failed', error.message);
      },
    });

    return uploadInstance.config.fileId; // Return the file ID
  }
});
