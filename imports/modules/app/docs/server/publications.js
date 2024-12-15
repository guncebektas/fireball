import {Meteor} from "meteor/meteor";
import {DOCS_PUBLICATION} from "../enums/publication";
import {docRepository} from "../docRepository";

Meteor.publish(DOCS_PUBLICATION.ALL, function () {
  return docRepository.find();
});
