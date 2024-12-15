import {Images} from "../database/images.js";
import {s3} from "./s3.js";
import {Log} from "meteor/logging";

//
// Removes files from AWS s3
//
Images.collection.after.remove(async (userId, doc) => {
  if (!userId) {
    return;
  }

  Log.debug(`Images.collection.before.remove for ${doc._id} triggered`);

  for (const [key] of Object.entries(doc.versions)) {
    await s3.deleteObject({
      Bucket: Meteor.settings.private.aws.bucket,
      Key: doc.versions[key].meta.pipePath,
    }).then(response => {
      console.log(response);
    }).catch(error => {
      Log.error(`images.collection.before.remove throw an error: ${error}`);
    });
  }
});
