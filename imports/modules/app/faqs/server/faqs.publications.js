import {Meteor} from "meteor/meteor";
import {FAQS_PUBLICATION} from "../enums/publication.js";
import {faqRepository} from "../faqRepository";
import {createProjection} from "../../../shared/functions/createProjection";

Meteor.publish(FAQS_PUBLICATION.ONE, function (_id) {
  if (!this.userId) {
    return this.ready();
  }

  return faqRepository.find({_id});
});

Meteor.publish(FAQS_PUBLICATION.ALL, function (columns) {
  if (!this.userId) {
    return this.ready();
  }

  const projection = createProjection(columns);

  return faqRepository.find({
    organizationId: Meteor.settings.public.app._id
  }, projection);
});
