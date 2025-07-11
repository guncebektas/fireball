import React, {useRef} from 'react';
import {Button, FloatingLabel} from 'flowbite-react';
import {STATE_AUTH_PASSWORD_FORM} from "./enums/state.js";
import {useTranslator} from "../../../providers/i18n";
import {ToastSuccess} from "../../../components/alert/Toast";
import {userSendResetPasswordEmail} from "../../../../../imports/modules/app/user/userPassword/userMethod";

export const ForgottenPassword = ({onStateChange}) => {
  const t = useTranslator();

  const emailRef = useRef();

  const handleState = () => {
    onStateChange(STATE_AUTH_PASSWORD_FORM.LOGIN);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      email: emailRef.current.value,
    };

    await userSendResetPasswordEmail({email: formData.email})
      .then(response => {
        ToastSuccess();
      })
  };

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 className="m-title text-center text-3xl md:text-4xl">
        {t('Forgotten password')}
      </h2>

      <div className="bg-white dark:bg-gray-900 py-8 px-4 mt-8 shadow sm:rounded-lg sm:px-10">
        <div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="mb-2">
              <FloatingLabel variant="standard" label={t('Type your email')} id="email" type="email" ref={emailRef} required/>
            </div>
            <div>
              <Button type="submit" color="primary">{t('Submit')}</Button>
            </div>

            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              {t('Do not have an account yet')}?
              <button className="font-medium hover:underline mx-1" onClick={() => handleState(STATE_AUTH_PASSWORD_FORM.REGISTER)}>{t('Register')}</button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
