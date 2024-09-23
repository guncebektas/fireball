import React from 'react';
import {H2} from "../../components/heading/Headings.jsx";
import {useTracker} from "meteor/react-meteor-data";
import {Button, Table} from "flowbite-react";
import {CONTACT_REQUESTS_PUBLICATION} from "../../../../imports/modules/contactRequests/enums/publication";
import {contactRequestRepository} from "../../../../imports/modules/contactRequests/contactRequestRepository";
import {contactRequestRemove} from "../../../../imports/modules/contactRequests/contact.methods";

export const ContactRequests = () => {
  const items = useTracker(() => {
    const handle = Meteor.subscribe(CONTACT_REQUESTS_PUBLICATION.ALL);

    if (!handle.ready()) {
      return [];
    }

    return contactRequestRepository.find().fetch();
  });

  const handleRemove = async (_id) => {
    await contactRequestRemove(_id);
  };

  return (
    <>
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
    </>
  );
};
