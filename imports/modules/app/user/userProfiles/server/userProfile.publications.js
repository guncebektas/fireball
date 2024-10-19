import {Meteor} from "meteor/meteor";
import {USER_PROFILE_PUBLICATION} from "../enums/publication.js";
import {userProfileRepository} from "../userProfileRepository.js";

Meteor.publish(USER_PROFILE_PUBLICATION.ME, function () {
  if (!this.userId) {
    return this.ready();
  }

  return userProfileRepository.find({
    _id: this.userId
  });
});

Meteor.publish(USER_PROFILE_PUBLICATION.PROFILES, function () {
  if (!this.userId) {
    return this.ready();
  }

  return userProfileRepository.find();
});
