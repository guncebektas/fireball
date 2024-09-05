import {Meteor} from "meteor/meteor";
import {PROFILE_PUBLICATION} from "../enums/publication.js";
import {profileRepository} from "../profileRepository.js";

Meteor.publish(PROFILE_PUBLICATION.ME, function () {
  if (!this.userId) {
    return this.ready();
  }

  return profileRepository.find({
    _id: this.userId
  });
});
