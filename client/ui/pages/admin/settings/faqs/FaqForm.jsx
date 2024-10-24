import React, {useRef} from 'react';
import {H2} from "../../../../components/heading/Headings.jsx";
import {AutoForm} from '../../../../../../imports/modules/shared/uniforms-tailwind/src';
import {useParams} from "react-router-dom";
import {useTracker} from "meteor/react-meteor-data";
import {FORM_TYPE} from "../../../../../shared/enums/formType.js";
import {ToastSuccess, ToastWarning} from "../../../../components/alert/Toast";
import {faqsBridge} from "../../../../../../imports/modules/app/faqs/schemas/faqsSchema";
import {faqModule} from "../../../../../../imports/modules/app/faqs/faqModule";

export const FaqForm = () => {
  const formRef = useRef();
  const {_id} = useParams();

  const _module = faqModule;

  let data = {};

  if (_id !== FORM_TYPE.INSERT) {
    data = useTracker(() => {
      const handle = Meteor.subscribe(_module.publisher.ONE, _id);

      if (!handle.ready()) {
        return [];
      }

      return _module.repository.findOne(_id);
    });
  }

  const handleSubmit = async function (formData) {
    _module.methods.upsert(formData)
      .then(response => {
        ToastSuccess();
      })
      .catch(error => {
        ToastWarning();
      });
  };

  return (
    <>
      <H2 text="FAQ" showBackButton={true}/>
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
