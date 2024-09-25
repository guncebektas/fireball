import {IMAGE_PUBLICATIONS} from "../enums/publications.js";
import {imageRepository} from "../imageRepository.js";

Meteor.publish(IMAGE_PUBLICATIONS.IMAGE, (imageId) => {
  return imageRepository.find({_id: imageId});
});

Meteor.publish(IMAGE_PUBLICATIONS.IMAGES, () => {
  return imageRepository.find({});
});
