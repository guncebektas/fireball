import React from 'react';
import {H2} from "../../../../components/heading/Headings.jsx";
import {useTracker} from "meteor/react-meteor-data";
import DataGrid from '../../../../components/dataGrid/DataGrid';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import {AddNewButton} from "../../../../components/buttons/AddNewButton";
import {useNavigate} from "react-router-dom";
import {setParam} from "../../../../../../imports/modules/shared/functions/setParam";
import {faqModule} from "../../../../../../imports/modules/app/faqs/faqModule";

export const FaqsList = () => {
  const navigate = useNavigate();

  const _module = faqModule;

  const columns = [
    {key: 'question', label: 'Question'},
    {key: 'answer', label: 'Answer'},
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
    navigate(setParam(_module.form.route, {key: '_id', value: _id}));
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
        <H2 text={_module.list.title} showBackButton={true}/>
        <AddNewButton route={_module.form.route}/>
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
