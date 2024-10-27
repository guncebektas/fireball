import React, {useState} from 'react';
import {H2} from "../../../../components/heading/Headings.jsx";
import {useTracker} from "meteor/react-meteor-data";
import DataGrid from '../../../../components/dataGrid/DataGrid';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import {AddNewButton} from "../../../../components/buttons/AddNewButton";
import {FaTimes} from "react-icons/fa";
import {ticketModule} from "../../../../../../imports/modules/app/tickets/ticketModule";
import {TicketFormModal} from "./TicketFormModal";

export const TicketsList = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const _module = ticketModule;
  const columns = [
    {key: 'message', label: 'Message'},
    {key: 'response', label: 'Answer'}
  ];

  const {items, loading} = useTracker(() => {
    const handle = Meteor.subscribe(_module.publisher.ALL, columns);
    return {
      loading: !handle.ready(),
      items: handle.ready() ? _module.repository.find().fetch() : []
    };
  });

  const handleEdit = (_id) => {
    setEditId(_id);
    setDrawerOpen(true);
  };

  const handleDelete = async (_id) => {
    await _module.methods.delete({_id});
  };

  const handleAddNew = () => {
    console.log('sss')
    setEditId('new');
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  const actions = [
    {
      label: 'Edit',
      icon: () => <FontAwesomeIcon icon={faEdit}/>,
      classes: 'bg-blue-500 hover:bg-blue-600',
      onClick: handleEdit,
    },
    {
      label: 'Delete',
      icon: () => <FontAwesomeIcon icon={faTrash}/>,
      classes: 'bg-blue-500 hover:bg-blue-600',
      onClick: handleDelete,
    },
  ];

  return (
    <>
      <div className="flex items-center">
        <H2 text={_module.list.title} showBackButton={true}/>
        <AddNewButton onClick={handleAddNew}/>
      </div>

      <DataGrid columns={columns} data={items} loading={loading} actions={actions} orderable={true}/>

      {/* Drawer for FaqForm */}
      {drawerOpen && (
        <div className="fixed top-0 right-0 w-96 h-full bg-white dark:bg-gray-900 shadow-lg z-50 transition-transform duration-300 transform translate-x-0">
          <button onClick={closeDrawer} className="absolute right-0 text-gray-500 p-4 hover:bg-gray-100">
            <FaTimes/>
          </button>
          <section className="p-5">
            <TicketFormModal _id={editId} closeDrawer={closeDrawer}/>
          </section>
        </div>
      )}
    </>
  );
};
