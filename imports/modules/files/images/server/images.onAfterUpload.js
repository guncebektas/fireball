import {Images} from "../database/images.js";
import {_} from 'meteor/underscore';
import {s3} from "./images.s3.js";
import fs from 'fs';
import {Random} from 'meteor/random';
import {imageRepository} from "../imageRepository";
import {Log} from "meteor/logging";

//
// Start moving files to AWS:S3, after fully received by the Meteor server
//
Images.on('afterUpload', function (fileRef) {
  Log.info('onAfterUpload');

  const {bucket} = Meteor.settings.private.aws
  if (bucket === "") {
    return;
  }

  // Run through each of the uploaded file
  _.each(fileRef.versions, async (vRef, version) => {
    // We use Random.id() instead of real file's _id
    // to secure files from reverse engineering on the AWS client
    let folder = `images`;
    if (Meteor.isDevelopment) {
      folder = `images-dev`;
    }

    const filePath = `${folder}/${Random.id()}-${version}.${fileRef.extension}`;

    // Create the AWS:S3 object.
    // Feel free to change the storage class from, see the documentation,
    // `STANDARD_IA` is the best deal for low access files.
    // Key is the file name we are creating on AWS:S3, so it will be like files/XXXXXXXXXXXXXXXXX-original.XXXX
    // Body is the file stream we are sending to AWS
    await s3.putObject({
      // ServerSideEncryption: 'AES256', // Optional
      StorageClass: 'STANDARD',
      Bucket: bucket,
      Key: filePath,
      Body: fs.createReadStream(vRef.path),
      ContentType: vRef.type,
    }).then(async response => {
      // Update FilesCollection with link to the file at AWS
      await imageRepository.updateAsync({
        _id: fileRef._id
      }, {
        $set: {
          ['versions.' + version + '.meta.pipePath']: filePath
        }
      }).then(async response => {
        this.unlink(await imageRepository.findOneAsync(fileRef._id), version);
      }).catch(error => {
        Log.error(error);
      })
    }).catch(error => {
      Log.error(error);
    });
  });
});
