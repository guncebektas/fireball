import {Meteor} from "meteor/meteor";
import {PUBLISH} from "../enums/publish";
import {notificationRepository} from "../notificationRepository";

Meteor.publish(PUBLISH.NOTIFICATIONS, function () {
  return notificationRepository.find();
});
