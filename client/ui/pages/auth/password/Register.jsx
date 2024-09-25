import React, {useRef, useState} from 'react';
import {Button, Label, TextInput} from 'flowbite-react';
import {STATE_AUTH_PASSWORD_FORM} from "./enums/state.js";
import {Accounts} from "meteor/accounts-base";
import PasswordInput from "../../../components/form/PasswordInput";
import {Alert} from "../../../components/alert/Alert";
import {useTranslator} from "../../../providers/i18n";

export const Register = ({onStateChange}) => {
  const t = useTranslator();

  const [openAlert, setOpenAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordAgainRef = useRef();

  const handleState = () => {
    onStateChange(STATE_AUTH_PASSWORD_FORM.LOGIN);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setOpenAlert(false);

    const formData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      passwordAgain: passwordAgainRef.current.value,
    };

    if (formData.password !== formData.passwordAgain) {
      setOpenAlert(true)
      setErrorMessage(`Passwords should be same.`)
      return;
    }

    await Accounts.createUserAsync({
      email: formData.email,
      password: formData.password,
      passwordAgain: formData.passwordAgain
    }).then(response => {
      window.location.reload();
    }).catch(error => {
      console.error(error);

      setOpenAlert(true)
      setErrorMessage(error.reason)
    });
  };

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 className="text-center text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
        {t('Register')}
      </h2>

      <div className="bg-white dark:bg-gray-900 py-8 px-4 mt-8 shadow sm:rounded-lg sm:px-10">
        <div>
          <Alert show={openAlert} color="failure" iconName="warning">
            <span className="font-medium">Error:</span> {errorMessage}
          </Alert>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="mb-2">
              <div className="mb-2 block">
                <Label htmlFor="email" value="Email Address"/>
              </div>
              <TextInput id="email" type="email" ref={emailRef} placeholder="Type your email" required/>
            </div>
            <div className="mb-2">
              <div className="mb-2 block">
                <Label htmlFor="password" value="Password"/>
              </div>
              <PasswordInput ref={passwordRef} required/>
            </div>
            <div className="mb-2">
              <div className="mb-2 block">
                <Label htmlFor="passwordAgain" value="Password Again"/>
              </div>
              <PasswordInput ref={passwordAgainRef} required/>
            </div>
            <div>
              <Button type="submit" color="primary">Register</Button>
            </div>

            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account? <button className="font-medium text-primary-600 hover:underline dark:text-primary-500" onClick={handleState}>Login here</button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
