import React, {useRef} from 'react';
import {H2} from "../../components/heading/Headings.jsx";
import {AutoForm} from '../../../../imports/modules/shared/uniforms-tailwind/src';
import {ticketsMethods} from "../../../../imports/modules/app/tickets/ticket.methods.js";
import {ticketBridge} from "../../../../imports/modules/app/tickets/schemas/ticketSchema.js";
import {useParams} from "react-router-dom";
import {useTracker} from "meteor/react-meteor-data";
import {TICKET_PUBLICATION} from "../../../../imports/modules/app/tickets/enums/publication.js";
import {ticketRepository} from "../../../../imports/modules/app/tickets/ticketRepository.js";
import {FORM_TYPE} from "../../../shared/enums/formType.js";
import {ToastSuccess, ToastWarning} from "../../components/alert/Toast";
import {Log} from "meteor/logging";

export const TicketForm = () => {
  const formRef = useRef();
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
    ticketsMethods.upsert(formData)
      .then(response => {
        ToastSuccess();
      })
      .catch(error => {
        Log.error(error);
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
