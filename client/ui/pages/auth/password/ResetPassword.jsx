import React, {useRef} from 'react';
import {Button, Label} from 'flowbite-react';
import {useTranslator} from "../../../providers/i18n";
import PasswordInput from "../../../components/form/PasswordInput";
import {useLocation} from "react-router-dom";
import {Accounts} from "meteor/accounts-base";

export const ResetPassword = () => {
  const t = useTranslator();
  const location = useLocation();

  const token = location.pathname.split('/').pop();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      password: passwordRef.current.value,
    };

    Accounts.resetPassword(token, formData.password, (error, response) => {
      console.log(error);
      console.log(response);
    })
  };

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 className="m-title text-center text-3xl md:text-4xl">
        {t('Type your new password')}
      </h2>

      <div className="bg-white dark:bg-gray-900 py-8 px-4 mt-8 shadow sm:rounded-lg sm:px-10">
        <div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="mb-2">
              <div className="mb-2 block">
                <Label htmlFor="password" value={t('Password')}/>
              </div>
              <PasswordInput ref={passwordRef} required/>
            </div>
            <div>
              <Button type="submit" color="primary">{t('Submit')}</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
