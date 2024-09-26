import React, {useState} from 'react';
import {Button, Label, TextInput} from "flowbite-react";
import {H2} from "../../components/heading/Headings.jsx";
import {ToastSuccess, ToastWarning} from "../../components/alert/Toast";
import {useTracker} from "meteor/react-meteor-data";
import {Meteor} from "meteor/meteor";
import {USER_PROFILE_PUBLICATION} from "../../../../imports/modules/userProfiles/enums/publication.js";
import {userProfileRepository} from "../../../../imports/modules/userProfiles/userProfileRepository.js";
import {profileUpdate} from "../../../../imports/modules/userProfiles/userProfile.methods.js";
import {useTranslator} from "../../providers/i18n";

export const ProfileDetails = () => {
  const t = useTranslator();

  const [formData, setFormData] = useState({
    email: '',
    firstname: '',
    lastname: '',
  });

  const user = useTracker(() => Meteor.user(), []);

  useTracker(() => {
    const handle = Meteor.subscribe(USER_PROFILE_PUBLICATION.ME);

    if (handle.ready()) {
      const me = userProfileRepository.findOne({_id: Meteor.userId()}) || {};
      let email  = user?.emails?.length > 0 ? user?.emails[0]?.address : '';

      setFormData({
        email,
        firstname: me.firstname || '',
        lastname: me.lastname || ''
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await profileUpdate({firstname: formData.firstname, lastname: formData.lastname})
      .then(response => {
        ToastSuccess();
      })
      .catch(error => {
        ToastWarning();
      })
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <>
      <H2 text="Profile"></H2>
      <div className="grid grid-flow-col justify-stretch space-x-4">
        <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
          <div className="mb-2">
            <div className="mb-2 block">
              <Label htmlFor="email" value={t('Your email')}/>
            </div>
            <TextInput id="email" type="text" value={formData.email} disabled/>
          </div>
          <div className="mb-2">
            <div className="mb-2 block">
              <Label htmlFor="firstname" value={t('Firstname')}/>
            </div>
            <TextInput id="firstname" type="text" value={formData.firstname} onChange={handleInputChange}/>
          </div>
          <div className="mb-2">
            <div className="mb-2 block">
              <Label htmlFor="lastname" value={t('Lastname')}/>
            </div>
            <TextInput id="lastname" type="text" value={formData.lastname} onChange={handleInputChange}/>
          </div>
          <div>
            <Button type="submit" color="primary">{t('Save')}</Button>
          </div>
        </form>
      </div>
    </>
  );
};
