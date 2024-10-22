import {FilesCollection} from 'meteor/ostrio:files';
import {TEN_MB} from "../enums/fileSize.js";
import {Log} from "meteor/logging";
import {COLLECTION_NAME} from "../../../../shared/enums/collectionNames";

export const Images = new FilesCollection({
  // debug: true,
  collectionName: COLLECTION_NAME.USER_PROFILE_PICTURE,
  allowClientCode: true, // Required to let you remove uploaded file
  onBeforeUpload(file) {
    Log.info('onBeforeUpload');

    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= TEN_MB && /png|jpg|jpeg/i.test(file.ext)) {
      return true;
    }

    return 'Please upload image, with size equal or less than 10MB';
  }
});
