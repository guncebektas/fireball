import { Button, Label, Modal, TextInput } from 'flowbite-react';
import { Log } from "meteor/logging";
import React, { useRef, useState } from 'react';
import { Alert } from "../../../components/alert/Alert";
import FloatingInput from "../../../components/form/FloatingInput";
import FloatingPasswordInput from "../../../components/form/FloatingPasswordInput";
import { useTranslator } from "../../../providers/i18n";
import { LoginWithGoogle } from "../services/LoginWithGoogle";
import { STATE_AUTH_PASSWORD_FORM } from "./enums/state.js";

export const Login = ({onStateChange}) => {
  const t = useTranslator();
  const {isUsernameLoginEnabled} = Meteor.settings.public;

  const [openModal, setOpenModal] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const emailRef = useRef();
  const passwordRef = useRef();
  const codeRef = useRef();

  const handleState = (state) => {
    onStateChange(state);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setOpenAlert(false);

    const formData = {
      email: emailRef.current.value,
      password: passwordRef.current.value
    };

    Meteor.loginWithPassword(formData.email, formData.password, (error, response) => {
      if (error) {
        if (error.error === "no-2fa-code") {
          setOpenModal(true)
        } else {
          setOpenAlert(true)
          setErrorMessage(`Something went wrong. Please check your credentials`)
        }

        return;
      }

      location.reload();
    });
  };

  const handleLogin2FA = (e) => {
    e.preventDefault();

    const formData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      code: codeRef.current.value
    };

    Meteor.loginWithPasswordAnd2faCode(formData.email, formData.password, formData.code, error => {
      if (error) {
        Log.error("Error trying to log in (user with 2fa)", error);
        return;
      }

      location.reload();
    });
  }

  return (
    <>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)} size="md" initialFocus={codeRef}>
        <Modal.Header>{t('2FA')}</Modal.Header>
        <form className="space-y-6" onSubmit={handleLogin2FA}>
          <Modal.Body>
            <div className="space-y-6">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="code" value="Code"/>
                </div>
                <TextInput id="code" ref={codeRef} required/>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" color="primary">{t('Login')}</Button>
          </Modal.Footer>
        </form>
      </Modal>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="m-title text-center text-3xl md:text-4xl">
          {t('Login')}
        </h2>

        <div className="bg-white dark:bg-gray-900 py-8 px-4 mt-8 shadow sm:rounded-lg sm:px-10">
          <div>
            <Alert show={openAlert} color="failure" iconName="warning" className="mb-3">
              <span className="font-medium">{t('Error')}:</span> {t(errorMessage)}
            </Alert>

            <form className="space-y-6 mb-5" onSubmit={handleLogin}>
              <div className="mb-1">
                {
                  isUsernameLoginEnabled ?
                    <FloatingInput label={t('Type your username')} id="email" type="text" ref={emailRef} required/>
                    :
                    <FloatingInput label={t('Type your email')} id="email" type="email" ref={emailRef} required/>
                }
              </div>

              <div className="mb-1">
                <FloatingPasswordInput ref={passwordRef} required/>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-800 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"/>
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">{t('Remember me')}</label>
                  </div>
                </div>
                <button type="button" className="font-medium text-gray-500 dark:text-gray-400 hover:underline" onClick={() => handleState(STATE_AUTH_PASSWORD_FORM.FORGOTTEN_PASSWORD)}>{t('Forgotten password')}</button>
              </div>
              <div>
                <Button type="submit" color="primary">{t('Login')}</Button>
              </div>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                {t('Do not have an account yet')}?
                <button className="font-medium hover:underline mx-1" onClick={() => handleState(STATE_AUTH_PASSWORD_FORM.REGISTER)}>{t('Register')}</button>
              </p>
            </form>

            <LoginWithGoogle/>
          </div>
        </div>
      </div>
    </>
  )
};
