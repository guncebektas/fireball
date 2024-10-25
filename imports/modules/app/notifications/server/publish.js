import {Meteor} from "meteor/meteor";
import {PUBLISH} from "../enums/publish";
import {notificationRepository} from "../notificationRepository";

Meteor.publish.stream(PUBLISH.NOTIFICATIONS, function () {
  return notificationRepository.find({
    organizationId: Meteor.settings.public.app._id
  });
});
