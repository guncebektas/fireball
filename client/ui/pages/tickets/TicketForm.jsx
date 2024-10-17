import React, {useRef} from 'react';
import {H2} from "../../components/heading/Headings.jsx";
import {AutoForm} from '../../../../imports/modules/shared/uniforms-tailwind/src';
import {ticketUpsert} from "../../../../imports/modules/tickets/ticket.methods.js";
import {ticketBridge} from "../../../../imports/modules/tickets/schemas/ticketSchema.js";
import {useParams} from "react-router-dom";
import {useTracker} from "meteor/react-meteor-data";
import {TICKET_PUBLICATION} from "../../../../imports/modules/tickets/enums/publication.js";
import {ticketRepository} from "../../../../imports/modules/tickets/ticketRepository.js";
import {FORM_TYPE} from "../../../shared/enums/formType.js";
import {ToastSuccess, ToastWarning} from "../../components/alert/Toast";

export const TicketForm = () => {
  const formRef = useRef();
  const {id} = useParams();

  let ticket = {};

  if (id !== FORM_TYPE.INSERT) {
    ticket = useTracker(() => {
      const handle = Meteor.subscribe(TICKET_PUBLICATION.ONE, id);

      if (!handle.ready()) {
        return [];
      }

      return ticketRepository.findOne(id);
    });
  }

  const handleSubmit = async function (formData) {
    ticketUpsert(formData)
      .then(response => {
        ToastSuccess();
      })
      .catch(error => {
        ToastWarning();
      });
  };

  return (
    <>
      <H2 text="Ticket"></H2>
      <div className="grid grid-flow-col justify-stretch space-x-4">
        <AutoForm
          ref={formRef}
          schema={ticketBridge}
          model={ticket}
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
};
