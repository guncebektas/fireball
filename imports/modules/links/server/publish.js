import {Meteor} from "meteor/meteor";
import {PUBLISH} from "../enums/publish";
import {linkRepository} from "../linkRepository";

Meteor.publish(PUBLISH.LINKS, function () {
  return linkRepository.find();
});
