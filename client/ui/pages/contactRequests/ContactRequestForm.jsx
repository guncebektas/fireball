import React, {useEffect, useRef} from 'react';
import {H2} from "../../components/heading/Headings";
import {AutoForm} from "../../../../imports/modules/shared/uniforms-tailwind/src";
import Map from "../../components/map/Map";
import {ToastSuccess} from "../../components/alert/Toast";
import {contactRequestMethod, contactRequestUpsert} from "../../../../imports/modules/app/contactRequests/contactRequestMethod";
import {contactBridge} from "../../../../imports/modules/app/contactRequests/schemas/contactSchema";
import {contactRequestModule} from "../../../../imports/modules/app/contactRequests/contactRequestModule";

export const ContactRequestForm = () => {
  const formRef = useRef();
  const siteKey = Meteor.settings.public.app.recaptcha.siteKey;

  const _module = contactRequestModule;

  // Dynamically load the reCAPTCHA script when the component mounts
  useEffect(() => {
    const loadRecaptcha = () => {
      if (!window.grecaptcha) {
        const script = document.createElement('script');
        script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
      }
    };

    loadRecaptcha();
  }, [siteKey]);

  const handleSubmit = async function (formData) {
    // Request reCAPTCHA token
    window.grecaptcha.ready(() => {
      window.grecaptcha.execute(siteKey, {action: 'submit'}).then((token) => {
        // Include the token in the form data
        formData.recaptchaToken = token;

        // Submit form data with reCAPTCHA token
        _module.methods.insert(formData)
          .then(response => {
            ToastSuccess();
            formRef.current.reset(); // Call the formRef properly
          })
          .catch(error => {
            console.log(error);
          });
      });
    });
  };

  const locations = [
    {title: 'Location 1', latitude: 41.0434, longitude: 29.0091},
    {title: 'Location 2', latitude: 40.7306, longitude: -73.9352},
    {title: 'Location 3', latitude: 48.8566, longitude: 2.3522},
  ];

  return (
    <>
      <H2 text="Contact us" showBackButton={true}/>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> {/* Single column on mobile, two columns on medium screens and up */}
        <div className="flex flex-col">
          <AutoForm
            ref={formRef}
            schema={contactBridge}
            onSubmit={handleSubmit}
          />
        </div>

        {/* Map will take full width on mobile and stay next to the form on larger screens */}
        <div className="md:col-span-1 order-last md:order-none"> {/* Ensures the map is below the form on mobile */}
          <Map markers={locations} zoom={14}/>
        </div>
      </div>
    </>
  );
};
