import {Meteor} from "meteor/meteor";
import {CONTACT_REQUESTS_PUBLICATION} from "../enums/publication.js";
import {contactRequestRepository} from "../contactRequestRepository";
import {createProjection} from "../../../shared/functions/createProjection";

Meteor.publish(CONTACT_REQUESTS_PUBLICATION.ALL, function (columns) {
  if (!this.userId) {
    return this.ready();
  }

  const projection = createProjection(columns);

  return contactRequestRepository.find({
    organizationId: Meteor.settings.public.app._id
  }, projection);
});
