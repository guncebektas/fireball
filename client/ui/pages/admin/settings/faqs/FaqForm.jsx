import React, {useRef} from 'react';
import {H2} from "../../../../components/heading/Headings.jsx";
import {AutoForm} from '../../../../../../imports/modules/shared/uniforms-tailwind/src';
import {useParams} from "react-router-dom";
import {useTracker} from "meteor/react-meteor-data";
import {FORM_TYPE} from "../../../../../shared/enums/formType.js";
import {ToastSuccess, ToastWarning} from "../../../../components/alert/Toast";
import {faqsMethod} from "../../../../../../imports/modules/app/faqs/faqs.methods";
import {faqsBridge} from "../../../../../../imports/modules/app/faqs/schemas/faqsSchema";
import {FAQS_PUBLICATION} from "../../../../../../imports/modules/app/faqs/enums/publication";
import {faqRepository} from "../../../../../../imports/modules/app/faqs/faqRepository";

export const FaqForm = () => {
  const formRef = useRef();
  const {_id} = useParams();

  let data = {};

  if (_id !== FORM_TYPE.INSERT) {
    data = useTracker(() => {
      const handle = Meteor.subscribe(FAQS_PUBLICATION.ONE, _id);

      if (!handle.ready()) {
        return [];
      }

      return faqRepository.findOne(_id);
    });
  }

  const handleSubmit = async function (formData) {
    faqsMethod.upsert(formData)
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
