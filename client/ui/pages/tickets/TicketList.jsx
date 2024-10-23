import React from 'react';
import {H2} from "../../components/heading/Headings.jsx";
import {useTracker} from "meteor/react-meteor-data";
import {useNavigate} from "react-router-dom";
import {setParam} from "../../../../imports/modules/shared/functions/setParam.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import DataGrid from '../../components/dataGrid/DataGrid';
import {ticketModule} from "../../../../imports/modules/app/tickets/ticketModule";

export const TicketList = () => {
  const navigate = useNavigate();

  const _module = ticketModule;

  const columns = [
    {key: 'message', label: 'Message'},
    {key: 'response', label: 'Answer'}
  ];

  // Track items and loading state
  const {items, loading} = useTracker(() => {
    const handle = Meteor.subscribe(_module.publisher.ALL, columns);

    return {
      loading: !handle.ready(),
      items: handle.ready() ? _module.repository.find().fetch() : []
    };
  });

  const handleEdit = async (_id) => {
    navigate(setParam(_module.formRoute, {key: '_id', value: _id}));
  };

  const handleDelete = async (_id) => {
    await _module.methods.delete({_id});
  };

  const actions = [{
    label: 'Edit',
    icon: () => <FontAwesomeIcon icon={faEdit}/>,
    classes: 'bg-blue-500 hover:bg-blue-600',
    onClick: handleEdit,
  }, {
    label: 'Delete',
    icon: () => <FontAwesomeIcon icon={faTrash}/>,
    classes: 'bg-blue-500 hover:bg-blue-600',
    onClick: handleDelete,
  }];

  return (
    <>
      <div className="flex items-center">
        <H2 text="Tickets" showBackButton={true}/>
      </div>

      <DataGrid
        columns={columns}
        data={items}
        loading={loading}
        actions={actions}
      />
    </>
  );
};

