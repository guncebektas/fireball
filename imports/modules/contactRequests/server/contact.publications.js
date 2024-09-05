import {Meteor} from "meteor/meteor";
import {CONTACT_PUBLICATION} from "../enums/publication.js";
import {contactRepository} from "../contactRepository";

Meteor.publish(CONTACT_PUBLICATION.ALL, function () {
  if (!this.userId) {
    return this.ready();
  }

  return contactRepository.find({});
});
