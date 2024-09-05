import {Meteor} from "meteor/meteor";
import {CONTACT_REQUESTS_PUBLICATION} from "../enums/publication.js";
import {contactRequestRepository} from "../contactRequestRepository";

Meteor.publish(CONTACT_REQUESTS_PUBLICATION.ALL, function () {
  if (!this.userId) {
    return this.ready();
  }

  return contactRequestRepository.find({});
});
