import React, {useRef} from 'react';
import {H2} from "../../components/heading/Headings.jsx";
import {AutoForm} from '../../../../imports/modules/shared/uniforms-tailwind/src';
import {ticketsMethod} from "../../../../imports/modules/app/tickets/ticketMethod.js";
import {useParams} from "react-router-dom";
import {useTracker} from "meteor/react-meteor-data";
import {TICKET_PUBLICATION} from "../../../../imports/modules/app/tickets/enums/publication.js";
import {ticketRepository} from "../../../../imports/modules/app/tickets/ticketRepository.js";
import {FORM_TYPE} from "../../../shared/enums/formType.js";
import {ToastSuccess, ToastWarning} from "../../components/alert/Toast";
import {Log} from "meteor/logging";
import {ticketAddBridge} from "../../../../imports/modules/app/tickets/schemas/ticketSchema";

export const TicketForm = ({schema}) => {
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
    ticketsMethod.upsert(formData)
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
      <H2 text="Ticket" showBackButton={true} />
      <div className="grid grid-flow-col justify-stretch space-x-4">
        <AutoForm
          ref={formRef}
          schema={ticketAddBridge}
          model={ticket}
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
};
