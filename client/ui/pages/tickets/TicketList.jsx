import React from 'react';
import {H2} from "../../components/heading/Headings.jsx";
import {useTracker} from "meteor/react-meteor-data";
import {ticketRepository} from "../../../../imports/modules/app/tickets/ticketRepository.js";
import {TICKET_PUBLICATION} from "../../../../imports/modules/app/tickets/enums/publication.js";
import {useNavigate} from "react-router-dom";
import {ROUTE} from "../../../routes/enums/route.js";
import {setParam} from "../../../../imports/modules/shared/functions/setParam.js";
import {ticketsMethods} from "../../../../imports/modules/app/tickets/ticket.methods.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import DataGrid from '../../components/dataGrid/DataGrid'; // Import the new DataGrid component
import {AddNewButton} from "../../components/buttons/AddNewButton";

export const TicketList = () => {
  const navigate = useNavigate();

  const _self = {
    publisher: TICKET_PUBLICATION.ALL,
    repository: ticketRepository,
    methods: ticketsMethods,
    formRoute: ROUTE.TICKETS_FORM,
  }

  const columns = [
    {key: 'message', label: 'Message'}
  ];

  // Track items and loading state
  const {items, loading} = useTracker(() => {
    const handle = Meteor.subscribe(_self.publisher, columns);

    return {
      loading: !handle.ready(),
      items: handle.ready() ? _self.repository.find().fetch() : []
    };
  });

  const handleEdit = async (_id) => {
    navigate(setParam(_self.formRoute, {key: '_id', value: _id}));
  };

  const handleDelete = async (_id) => {
    await _self.methods.delete({_id});
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
        <AddNewButton route={_self.formRoute}/>
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

