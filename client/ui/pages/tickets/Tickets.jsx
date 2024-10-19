import React from 'react';
import {H2} from "../../components/heading/Headings.jsx";
import {useTracker} from "meteor/react-meteor-data";
import {ticketRepository} from "../../../../imports/modules/app/tickets/ticketRepository.js";
import {TICKET_PUBLICATION} from "../../../../imports/modules/app/tickets/enums/publication.js";
import {Link} from "react-router-dom";
import {ROUTE} from "../../../routes/enums/route.js";
import {Button, Table} from "flowbite-react";
import {setParam} from "../../../../imports/modules/shared/functions/setParam.js";
import {ticketRemove} from "../../../../imports/modules/app/tickets/ticket.methods.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {useTranslator} from "../../providers/i18n";

export const Tickets = () => {
  const t = useTranslator();

  const tickets = useTracker(() => {
    const handle = Meteor.subscribe(TICKET_PUBLICATION.ALL);

    if (!handle.ready()) {
      return [];
    }

    return ticketRepository.find().fetch();
  });

  const handleRemove = async (_id) => {
    await ticketRemove(_id);
  };

  return (
    <>
      <div className="sm:flex sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center">
            <H2 text="Ticket"/>

            <div className="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:flex sm:items-center">
              <Link to={setParam(ROUTE.TICKET, {key: '_id', value: 'new'})}>
                <Button gradientMonochrome="purple" size="sm">
                  <FontAwesomeIcon icon={faPlus}/>
                  {t('Add')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-2 w-full text-gray-500 text-lg">
        <Table striped hoverable className="w-full">
          <Table.Body>
            {tickets.map((item) => (
              <Table.Row key={item._id}>
                <Table.Cell>{item.message}</Table.Cell>
                <Table.Cell>
                  <div className="flex flex-wrap gap-2">
                    <Link to={setParam(ROUTE.TICKET, {key: '_id', value: item._id})}>
                      <Button outline gradientDuoTone="purpleToPink" size="xs">
                        <FontAwesomeIcon icon={faEdit}/>
                        {t('Edit')}
                      </Button>
                    </Link>
                    <Button outline gradientDuoTone="pinkToOrange" size="xs" onClick={() => handleRemove(item._id)}>
                      <FontAwesomeIcon icon={faTrash}/>
                      {t('Delete')}
                    </Button>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </>
  );
};
