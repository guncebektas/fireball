import React from 'react';
import {H2} from "../../../../components/heading/Headings.jsx";
import {useTracker} from "meteor/react-meteor-data";
import DataGrid from '../../../../components/dataGrid/DataGrid';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import {FAQS_PUBLICATION} from "../../../../../../imports/modules/app/faqs/enums/publication";
import {AddNewButton} from "../../../../components/buttons/AddNewButton";
import {ROUTE} from "../../../../../routes/enums/route";
import {faqRepository} from "../../../../../../imports/modules/app/faqs/faqRepository";
import {useNavigate} from "react-router-dom";
import {faqsMethod} from "../../../../../../imports/modules/app/faqs/faqs.methods";
import {setParam} from "../../../../../../imports/modules/shared/functions/setParam";

export const FaqsList = () => {
  const navigate = useNavigate();

  const _self = {
    publisher: FAQS_PUBLICATION.ALL,
    repository: faqRepository,
    methods: faqsMethod,
    formRoute: ROUTE.SETTINGS_FAQS_FORM,
  }

  const columns = [
    {key: 'question', label: 'Question'},
    {key: 'answer', label: 'Answer'},
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
        <H2 text="FAQs" showBackButton={true}/>
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
