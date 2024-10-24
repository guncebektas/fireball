import React from 'react';
import {H2} from "../../../../components/heading/Headings.jsx";
import {useTracker} from "meteor/react-meteor-data";
import DataGrid from '../../../../components/dataGrid/DataGrid'; // Import the new DataGrid component
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {CONTACT_REQUESTS_PUBLICATION} from "../../../../../../imports/modules/app/contactRequests/enums/publication"; // FontAwesome icons
import {contactRequestRepository} from "../../../../../../imports/modules/app/contactRequests/contactRequestRepository";
import {contactRequestDelete, contactRequestMethods} from "../../../../../../imports/modules/app/contactRequests/contact.methods";
import {contactRequestModule} from "../../../../../../imports/modules/app/contactRequests/contactRequestModule";

export const ContactRequests = () => {
  const _module = contactRequestModule;
  const columns = [
    {key: 'name', label: 'First name'},
    {key: 'phoneNumber', label: 'Phone number'},
    {key: 'email', label: 'Email'},
    {key: 'subject', label: 'Subject'},
    {key: 'message', label: 'Message'},
  ];

  // Track items and loading state
  const {items, loading} = useTracker(() => {
    const handle = Meteor.subscribe(_module.publisher.ALL, columns);

    return {
      loading: !handle.ready(),
      items: handle.ready() ? _module.repository.find().fetch() : []
    };
  });

  const handleRemove = async (_id) => {
    await _module.methods.delete({_id});
  };

  const actions = [
    {
      label: 'Delete',
      icon: () => <FontAwesomeIcon icon={faTrash}/>,
      color: 'failure',
      classes: 'bg-red-500 hover:bg-red-600',
      onClick: handleRemove,
    },
  ];

  return (
    <>
      <H2 text={_module.list.title} showBackButton={true}></H2>
      <DataGrid
        columns={columns}
        data={items}
        loading={loading}
        actions={actions}
      />
    </>
  );
};
