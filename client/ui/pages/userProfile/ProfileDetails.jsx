import React, {useState} from 'react';
import {Button, Label, Select, TextInput} from 'flowbite-react';
import {Meteor} from 'meteor/meteor';
import {useTracker} from 'meteor/react-meteor-data';
import {userProfilesMethods} from '../../../../imports/modules/app/user/userProfiles/userProfileMethod';
import {userProfileRepository} from '../../../../imports/modules/app/user/userProfiles/userProfileRepository';
import {USER_PROFILE_PUBLICATION} from '../../../../imports/modules/app/user/userProfiles/enums/publication';
import {useTranslator} from "../../providers/i18n";
import SubmitButton from "../../components/buttons/SubmitButton";
import {H2} from "../../components/heading/Headings";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";
import {ROUTE} from "../../../routes/enums/route"; // Import spinner icon

export const ProfileDetails = () => {
  const {isUsernameLoginEnabled} = Meteor.settings.public;
  const t = useTranslator();
  const [formData, setFormData] = useState({
    email: '',
    firstname: '',
    lastname: '',
    gender: '',
    phoneNumber: '',
  });
  const [loading, setLoading] = useState(false); // Add loading state

  const user = useTracker(() => Meteor.user(), []);

  useTracker(() => {
    const subscription = Meteor.subscribe(USER_PROFILE_PUBLICATION.ME);
    if (subscription.ready()) {
      const userProfile = userProfileRepository.findOne({_id: Meteor.userId()}) || {};
      const email = user?.emails?.[0]?.address || '';
      setFormData({
        email,
        firstname: userProfile.firstname || '',
        lastname: userProfile.lastname || '',
        gender: userProfile.gender || '',
        phoneNumber: userProfile.phoneNumber || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const {id, value} = e.target;
    setFormData((prevData) => ({...prevData, [id]: value}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true

    await userProfilesMethods.updateDetails({
      firstname: formData.firstname,
      lastname: formData.lastname,
      gender: formData.gender,
      phoneNumber: Number(formData.phoneNumber),
    })
      .then(response => {
        console.log(response);
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

  const navigate = useNavigate();
  const handleLogout = () => {
    Meteor.logout();
    navigate(ROUTE.HOME);
    location.reload();
  };

  return (
    <>
      <div className="flex items-center">
        <H2 text="Details"/>
      </div>
      <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="email" value={isUsernameLoginEnabled ? t('Username') : t('Email')}/>
          <TextInput id="email" type="text" value={formData.email} disabled/>
        </div>
        <div>
          <Label htmlFor="firstname" value={t('First name')}/>
          <TextInput id="firstname" type="text" value={formData.firstname} onChange={handleChange}/>
        </div>
        <div>
          <Label htmlFor="lastname" value={t('Last name')}/>
          <TextInput id="lastname" type="text" value={formData.lastname} onChange={handleChange}/>
        </div>
        <div>
          <Label htmlFor="gender" value={t('Gender')}/>
          <Select id="gender" value={formData.gender} onChange={handleChange}>
            <option value="">{t('Select gender')}</option>
            <option value="male">{t('Male')}</option>
            <option value="female">{t('Female')}</option>
            <option value="other">{t('Other')}</option>
          </Select>
        </div>
        <div>
          <Label htmlFor="phoneNumber" value={t('Phone number')}/>
          <TextInput id="phoneNumber" type="number" value={formData.phoneNumber} onChange={handleChange}/>
        </div>
        <SubmitButton
          isLoading={loading}
          text={{default: t('Save'), loading: t('Loading...')}} // Pass loading and default text
          className="mb-4"
        />
      </form>

      <Button type="button" color="secondary" onClick={handleLogout} className={'mb-6'}>
        <FontAwesomeIcon icon={faRightFromBracket} className="mr-2"/>
        {t('Logout')}
      </Button>
    </>
  );
};
