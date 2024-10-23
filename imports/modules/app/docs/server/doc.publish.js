import {Meteor} from "meteor/meteor";
import {PUBLISH} from "../enums/publish";
import {docRepository} from "../docRepository";

Meteor.publish(PUBLISH.DOCS, function () {
  return docRepository.find();
});
