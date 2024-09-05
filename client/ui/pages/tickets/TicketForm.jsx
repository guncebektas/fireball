import React from 'react';
import {H2} from "../../components/heading/Headings.jsx";
import {AutoForm} from '../../../../imports/modules/shared/uniforms-tailwind/src';
import {ticketUpsert} from "../../../../imports/modules/tickets/ticket.methods.js";
import {ticketBridge} from "../../../../imports/modules/tickets/schemas/ticketSchema.js";
import {useParams} from "react-router-dom";
import {useTracker} from "meteor/react-meteor-data";
import {TICKET_PUBLICATION} from "../../../../imports/modules/tickets/enums/publication.js";
import {ticketRepository} from "../../../../imports/modules/tickets/ticketRepository.js";
import {FORM_TYPE} from "../../../shared/enums/formType.js";

export const TicketForm = () => {
  const {_id} = useParams();

  let ticket = {};

  if (_id !== FORM_TYPE.INSERT) {
    ticket = useTracker(() => {
      const handle = Meteor.subscribe(TICKET_PUBLICATION.ONE, _id);

      if (!handle.ready()) {
        return [];
      }

      return ticketRepository.findOne(_id);
    });
  }

  const handleSubmit = async function (formData) {
    ticketUpsert(formData)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
  };

  return (
    <div className="px-4 py-5 sm:p-6">
      <H2 text="Ticket"></H2>
      <div className="grid grid-flow-col justify-stretch space-x-4">
        <AutoForm schema={ticketBridge} model={ticket} onSubmit={handleSubmit}/>
      </div>
    </div>
  );
};
