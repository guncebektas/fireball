import React, {useRef, useState} from 'react';
import {Button, Label, TextInput} from 'flowbite-react';
import {STATE_AUTH_PASSWORD_FORM} from "./enums/state.js";
import {Accounts} from "meteor/accounts-base";
import PasswordInput from "../../../components/form/PasswordInput";
import {Alert} from "../../../components/alert/Alert";

export const Register = ({onStateChange}) => {
  const {appName, appLogo} = Meteor.settings.public;

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
    <>
      <div className="flex flex-col items-center justify-center mx-auto mb-4 text-4xl scale-150">
        <img src={appLogo} alt={appName}/>
        <span className="hidden md:block self-center text-2xl font-extrabold whitespace-nowrap dark:text-white">
          {appName}
        </span>
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">Register</h2>

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
                <Button type="submit" className="w-full flex justify-center py-1 px-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Register</Button>
              </div>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account? <button className="font-medium text-primary-600 hover:underline dark:text-primary-500" onClick={handleState}>Login here</button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
