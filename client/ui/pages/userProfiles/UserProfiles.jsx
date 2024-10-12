import React from 'react';
import { H2 } from "../../components/heading/Headings.jsx";
import { useTracker } from "meteor/react-meteor-data";
import { useTranslator } from "../../providers/i18n";
import { USER_PROFILE_PUBLICATION } from "../../../../imports/modules/userProfiles/enums/publication";
import { userProfileRepository } from "../../../../imports/modules/userProfiles/userProfileRepository";
import DataGrid from '../../components/dataGrid/DataGrid'; // Import the new DataGrid component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'; // FontAwesome icons

export const UserProfiles = () => {
  const t = useTranslator();

  // Track items and loading state
  const { items, loading } = useTracker(() => {
    const handle = Meteor.subscribe(USER_PROFILE_PUBLICATION.PROFILES);

    return {
      loading: !handle.ready(),
      items: handle.ready() ? userProfileRepository.find().fetch() : []
    };
  });

  const handleEdit = (_id) => {
    // Handle edit action
  };

  const handleRemove = async (_id) => {
    // Handle remove action
  };

  const actions = [
    {
      label: 'Edit',
      icon: () => <FontAwesomeIcon icon={faEdit} />,
      classes: 'bg-blue-500 hover:bg-blue-600',
      onClick: handleEdit,
    },
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
      <H2 text="User profiles" showBackButton={true}></H2>
      <DataGrid
        columns={[
          { key: 'firstname', label: 'First name' },
          { key: 'lastname', label: 'Last name' },
          { key: 'gender', label: 'Gender' },
          { key: 'email', label: 'Email' },
          { key: 'phone', label: 'Phone number' },
        ]}
        data={items}
        loading={loading}
        actions={actions}
      />
    </>
  );
};
