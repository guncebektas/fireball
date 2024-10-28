import {Meteor} from "meteor/meteor";
import {USER_PROFILE_PUBLICATION} from "../enums/publication.js";
import {userProfileRepository} from "../userProfileRepository.js";
import {createProjection} from "../../../../shared/functions/createProjection";
import {publishComposite} from 'meteor/reywood:publish-composite';

Meteor.publish.stream(USER_PROFILE_PUBLICATION.ME, function () {
  if (!this.userId) {
    return this.ready();
  }

  return userProfileRepository.find({
    _id: this.userId
  });
});

publishComposite(USER_PROFILE_PUBLICATION.ALL, function (columns) {
  if (!this.userId) {
    return this.ready();
  }

  const projection = createProjection(columns);

  return {
    find() {
      return userProfileRepository.find({}, projection);
    },
    children: [{
      find(userProfile) {
        return Meteor.users.find(
          {_id: userProfile._id},
          {fields: {emails: 1, username: 1}});
      }
    }]
  }
});

