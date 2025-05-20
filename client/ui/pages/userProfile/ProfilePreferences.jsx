import React, {useState} from 'react';
import {Label, Select} from 'flowbite-react';
import {Meteor} from 'meteor/meteor';
import {useTracker} from 'meteor/react-meteor-data';
import {userProfilesMethods} from '../../../../imports/modules/app/user/userProfiles/userProfileMethod';
import {userProfileRepository} from '../../../../imports/modules/app/user/userProfiles/userProfileRepository';
import {USER_PROFILE_PUBLICATION} from '../../../../imports/modules/app/user/userProfiles/enums/publication';
import {useTranslator} from "../../providers/i18n";
import SubmitButton from "../../components/buttons/SubmitButton";
import {H2} from "../../components/heading/Headings";

export const ProfilePreferences = () => {
  const t = useTranslator();
  const [formData, setFormData] = useState({
    theme: 'light',
  });
  const [loading, setLoading] = useState(false); // Add loading state

  const user = useTracker(() => Meteor.user(), []);

  const subscription = Meteor.subscribe(USER_PROFILE_PUBLICATION.ME);
  if (subscription.ready()) {
    const me = userProfileRepository.findOne({_id: Meteor.userId()}) || {};
    useTracker(() => {
      setFormData({
        theme: me?.theme || 'light'
      });
    }, [user]);
  }

  const handleChange = (e) => {
    const {id, value} = e.target;
    setFormData((prevData) => ({...prevData, [id]: value}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true

    await userProfilesMethods.updatePreferences({
      theme: formData.theme,
    })
      .then(response => {
        localStorage.setItem('flowbite-theme-mode', formData.theme);
        // ToastSuccess();
      })
      .catch(error => {
        console.log(error);
        // ToastWarning();
      })
      .finally(() => {
        setLoading(false); // Reset loading state
      });
  };

  return (
    <>
      <div className="flex items-center">
        <H2 text="Preferences"/>
      </div>
      <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="theme" value={t('Theme')}/>
          <Select id="theme" value={formData.theme} onChange={handleChange}>
            <option value="light">{t('Light')}</option>
            <option value="dark">{t('Dark')}</option>
          </Select>
        </div>
        <SubmitButton
          isLoading={loading}
          text={{default: t('Save'), loading: t('Loading...')}} // Pass loading and default text
        />
      </form>
    </>
  );
};
