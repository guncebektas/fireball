import React, {useRef, useState} from 'react';
import {Button, Label, TextInput, Alert} from 'flowbite-react';
import {H2} from '../../components/heading/Headings.jsx';
import {Accounts} from 'meteor/accounts-base';
import PasswordInput from "../../components/form/PasswordInput";
import {useTranslator} from "../../providers/i18n";

export const ProfileChangePassword = () => {
  const t = useTranslator();

  const currentPasswordRef = useRef();
  const password1Ref = useRef();
  const password2Ref = useRef();

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const {id, value} = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      currentPassword: currentPasswordRef.current.value,
      password1: password1Ref.current.value,
      password2: password2Ref.current.value
    };

    // Validation for password similarity
    if (formData.password1 !== formData.password2) {
      setError(`${t('Passwords do not match')}!`);
      return;
    }

    // Update password using Meteor's Accounts.changePassword
    Accounts.changePassword(formData.currentPassword, formData.password1, (err) => {
      if (err) {
        setError(err.reason || `${t('Failed to change password')}!`);
      } else {
        setSuccess(`${t('Password updated successfully')}!`);
      }
    });
  };

  return (
    <>
      <div className="my-3">
        <H2 text="Change password"/>
      </div>

      <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="currentPassword" value={t('Current password')}/>
          <PasswordInput ref={currentPasswordRef} required/>
        </div>
        <div>
          <Label htmlFor="newPassword1" value={t('New password')}/>
          <PasswordInput ref={password1Ref} required/>
        </div>
        <div>
          <Label htmlFor="newPassword2" value={t('Confirm new password')}/>
          <PasswordInput ref={password2Ref} required/>
        </div>

        {error && <Alert color="failure">{error}</Alert>}
        {success && <Alert color="success">{success}</Alert>}

        <Button type="submit" color="primary">{t('Save')}</Button>
      </form>
    </>
  );
};
