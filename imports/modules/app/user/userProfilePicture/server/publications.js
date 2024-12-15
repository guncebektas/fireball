import {IMAGE_PUBLICATION} from "../enums/publication.js";
import {imageRepository} from "../imageRepository.js";

Meteor.publish(IMAGE_PUBLICATION.ONE, (imageId) => {
  return imageRepository.find({_id: imageId});
});

Meteor.publish(IMAGE_PUBLICATION.ALL, () => {
  return imageRepository.find({});
});
