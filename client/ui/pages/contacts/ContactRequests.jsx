import React from 'react';
import {H2} from "../../components/heading/Headings.jsx";
import {useTracker} from "meteor/react-meteor-data";
import {ticketRepository} from "../../../../imports/modules/tickets/ticketRepository.js";
import {TICKET_PUBLICATION} from "../../../../imports/modules/tickets/enums/publication.js";
import {Link} from "react-router-dom";
import {ROUTE} from "../../../routes/enums/route.js";
import {Button, Table} from "flowbite-react";
import {setParam} from "../../../shared/helpers/setParam.js";
import {ticketRemove} from "../../../../imports/modules/tickets/ticket.methods.js";
import {CONTACT_PUBLICATION} from "../../../../imports/modules/contactRequests/enums/publication";
import {contactRepository} from "../../../../imports/modules/contactRequests/contactRepository";
import {contactRemove} from "../../../../imports/modules/contactRequests/contact.methods";

export const ContactRequests = () => {
  const items = useTracker(() => {
    const handle = Meteor.subscribe(CONTACT_PUBLICATION.ALL);

    if (!handle.ready()) {
      return [];
    }

    return contactRepository.find().fetch();
  });

  const handleRemove = async (_id) => {
    await contactRemove({_id});
  };

  return (
    <>
      <div className="px-4 py-5 sm:p-6">
        <div className="sm:flex sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center">
              <H2 text="Contact requests"></H2>
            </div>
          </div>
        </div>
        <div className="mt-2 w-full text-gray-500 text-lg">
          <Table striped hoverable className="w-full">
            <Table.Body>
              {items.map((item) => (
                <Table.Row key={item._id}>
                  <Table.Cell>{item.name}</Table.Cell>
                  <Table.Cell>{item.phoneNumber}</Table.Cell>
                  <Table.Cell>{item.email}</Table.Cell>
                  <Table.Cell>{item.subject}</Table.Cell>
                  <Table.Cell>{item.message}</Table.Cell>
                  <Table.Cell>
                    <div className="flex flex-wrap gap-2">
                      <Button color="failure" onClick={() => handleRemove(item._id)}>Delete</Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    </>
  );
};
