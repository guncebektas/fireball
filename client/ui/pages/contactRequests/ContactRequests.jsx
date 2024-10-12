import React from 'react';
import {H2} from "../../components/heading/Headings.jsx";
import {useTracker} from "meteor/react-meteor-data";
import DataGrid from '../../components/dataGrid/DataGrid'; // Import the new DataGrid component
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {CONTACT_REQUESTS_PUBLICATION} from "../../../../imports/modules/contactRequests/enums/publication";
import {contactRequestRepository} from "../../../../imports/modules/contactRequests/contactRequestRepository";
import {contactRequestRemove} from "../../../../imports/modules/contactRequests/contact.methods"; // FontAwesome icons

export const ContactRequests = () => {
  // Track items and loading state
  const { items, loading } = useTracker(() => {
    const handle = Meteor.subscribe(CONTACT_REQUESTS_PUBLICATION.ALL);

    return {
      loading: !handle.ready(),
      items: handle.ready() ? contactRequestRepository.find().fetch() : []
    };
  });

  const handleRemove = async (_id) => {
    await contactRequestRemove({_id});
  };

  const actions = [
    {
      label: 'Delete',
      icon: () => <FontAwesomeIcon icon={faTrash} />,
      color: 'failure',
      classes: 'bg-red-500 hover:bg-red-600',
      onClick: handleRemove,
    },
  ];

  return (
    <>
      <H2 text="Contact requests" showBackButton={true}></H2>
      <DataGrid
        columns={[
          { key: 'name', label: 'First name' },
          { key: 'phoneNumber', label: 'Phone number' },
          { key: 'email', label: 'Email' },
          { key: 'subject', label: 'Subject' },
          { key: 'message', label: 'Message' },
        ]}
        data={items}
        loading={loading}
        actions={actions}
      />
    </>
  );
};
