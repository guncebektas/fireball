import {Meteor} from "meteor/meteor";
import {NOTIFICATIONS_PUBLICATION} from "../enums/publication";
import {notificationRepository} from "../notificationRepository";

Meteor.publish.stream(NOTIFICATIONS_PUBLICATION.ALL, function () {
  return notificationRepository.find({
    organizationId: Meteor.settings.public.app._id
  });
});
