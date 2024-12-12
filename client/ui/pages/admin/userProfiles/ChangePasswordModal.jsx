import React, {useRef, useState} from 'react';
import {Button, Label, Modal} from 'flowbite-react';
import {useTranslator} from "../../../providers/i18n";
import PasswordInput from "../../../components/form/PasswordInput";
import {userSetPassword} from "../../../../../imports/modules/app/user/userPassword/user.methods";

export const ChangePasswordModal = ({userId, isOpen, onClose}) => {
  const t = useTranslator();

  const newPasswordRef = useRef();
  const confirmPasswordRef = useRef();

  const [error, setError] = useState(null);

  const handlePasswordChange = async () => {
    const formData = {
      newPassword: newPasswordRef.current.value,
      confirmPassword: confirmPasswordRef.current.value
    };

    if (formData.newPassword !== formData.confirmPassword) {
      setError(t('Passwords do not match'));
      return;
    }

    await userSetPassword({
      userId: userId,
      password: formData.newPassword
    }).then(response => {
      setError(null);
      onClose(); // Close modal on success
    }).catch(error => {
      console.log(error);
      setError(t('Error resetting password'));
    })
  };

  return (
    <Modal dismissible show={isOpen} onClose={onClose}>
      <Modal.Header>{t('Reset Password for')} {userId}</Modal.Header>
      <form onSubmit={handlePasswordChange}>
        <Modal.Body>
          <div className="mb-3">
            <div className="mb-2 block">
              <Label htmlFor="password" value={t('New password')}/>
            </div>
            <PasswordInput ref={newPasswordRef} required/>
          </div>

          <div className="mb-1">
            <div className="mb-2 block">
              <Label htmlFor="password" value={t('Confirm password')}/>
            </div>
            <PasswordInput ref={confirmPasswordRef} required/>
          </div>

          {error && <p className="text-red-500 mt-2">{error}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={onClose}>{t('Close')}</Button>
          <Button color="blue" onClick={handlePasswordChange}>{t('Reset password')}</Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
