import React from 'react';
import {H2} from "../../components/heading/Headings";
import {AutoForm} from "../../../../imports/modules/shared/uniforms-tailwind/src";
import {contactBridge} from "../../../../imports/modules/contactRequests/schemas/contactSchema";
import {contactRequestUpsert} from "../../../../imports/modules/contactRequests/contact.methods";
import Map from "../../components/map/Map";
import {ToastSuccess} from "../../components/alert/Toast";

export const ContactRequestForm = () => {
  const {name} = Meteor.settings.public.app;

  const handleSubmit = async function (formData) {
    contactRequestUpsert(formData)
      .then(response => {
        ToastSuccess()
      })
      .catch(error => {
        console.log(error);
      });
  };

  const locations = [
    { title: 'Location 1', latitude: 41.0434, longitude: 29.0091 },
    { title: 'Location 2', latitude: 40.7306, longitude: -73.9352 },
    { title: 'Location 3', latitude: 48.8566, longitude: 2.3522 },
  ];

  return (
    <>
      <H2 text="Contact us" />
      <div className="grid grid-cols-2 gap-4"> {/* Two-column layout */}
        <div className="flex flex-col">
          <AutoForm schema={contactBridge} onSubmit={handleSubmit} />
        </div>

        <Map markers={locations} zoom={14} />
      </div>
    </>
  );
};
