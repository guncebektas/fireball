import React, { useRef } from 'react';
import { H2 } from "../../../../components/heading/Headings.jsx";
import { AutoForm } from '../../../../../../imports/modules/shared/uniforms-tailwind/src';
import { useTracker } from "meteor/react-meteor-data";
import { FORM_TYPE } from "../../../../../shared/enums/formType.js";
import { ToastSuccess, ToastWarning } from "../../../../components/alert/Toast";
import { faqsBridge } from "../../../../../../imports/modules/app/faqs/schemas/faqsSchema";
import { faqModule } from "../../../../../../imports/modules/app/faqs/faqModule";

export const FaqForm = ({ _id, closeDrawer }) => {
  const formRef = useRef();
  const _module = faqModule;

  let data = {};

  if (_id && _id !== FORM_TYPE.INSERT) {
    data = useTracker(() => {
      const handle = Meteor.subscribe(_module.publisher.ONE, _id);
      return handle.ready() ? _module.repository.findOne(_id) : {};
    });
  }

  const handleSubmit = async (formData) => {
    _module.methods.upsert(formData)
      .then(response => {
        ToastSuccess();
        closeDrawer();
      })
      .catch(error => {
        ToastWarning();
      });
  };

  return (
    <>
      <H2 text={_module.form.title} showBackButton={false} />
      <div className="grid grid-flow-col justify-stretch space-x-4">
        <AutoForm
          ref={formRef}
          schema={faqsBridge}
          model={data}
          onSubmit={handleSubmit}
        />
      </div>
    </>
  );
};
