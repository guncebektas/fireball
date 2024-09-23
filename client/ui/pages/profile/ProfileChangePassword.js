import React, {useRef, useState} from 'react';
import { Button, Label, TextInput, Alert } from 'flowbite-react';
import { H2 } from '../../components/heading/Headings.jsx';
import { Accounts } from 'meteor/accounts-base';
import PasswordInput from "../../components/form/PasswordInput";

export const ProfileChangePassword = () => {
  const currentPasswordRef = useRef();
  const password1Ref = useRef();
  const password2Ref = useRef();

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { id, value } = e.target;
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
      setError('Passwords do not match');
      return;
    }

    // Update password using Meteor's Accounts.changePassword
    Accounts.changePassword(formData.currentPassword, formData.password1, (err) => {
      if (err) {
        setError(err.reason || 'Failed to change password.');
      } else {
        setSuccess('Password updated successfully.');
      }
    });
  };

  return (
    <>
      <H2 text="Change Password" />
      <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
        <div className="mb-2">
          <Label htmlFor="currentPassword" value="Current Password" />
          <PasswordInput ref={currentPasswordRef} required/>
        </div>
        <div className="mb-2">
          <Label htmlFor="newPassword1" value="New Password" />
          <PasswordInput ref={password1Ref} required/>
        </div>
        <div className="mb-2">
          <Label htmlFor="newPassword2" value="Confirm New Password" />
          <PasswordInput ref={password2Ref} required/>
        </div>
        {error && <Alert color="failure">{error}</Alert>}
        {success && <Alert color="success">{success}</Alert>}
        <Button type="submit" className="w-full flex justify-center py-1 px-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Save
        </Button>
      </form>
    </>
  );
};
