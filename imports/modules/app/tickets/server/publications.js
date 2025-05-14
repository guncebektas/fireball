import {Meteor} from "meteor/meteor";
import {TICKET_PUBLICATION} from "../enums/publication.js";
import {check} from "meteor/check";
import {ticketRepository} from "../ticketRepository.js";

Meteor.publish(TICKET_PUBLICATION.ONE, function (ticketId) {
  check(ticketId, String);

  if (!this.userId) {
    return this.ready();
  }

  return ticketRepository.find({_id: ticketId});
});

Meteor.publish(TICKET_PUBLICATION.ALL, function () {
  if (!this.userId) {
    return this.ready();
  }

  return ticketRepository.find({});
});
