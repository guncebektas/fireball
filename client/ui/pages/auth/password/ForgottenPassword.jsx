import React, {useRef} from 'react';
import {Button, Label, TextInput} from 'flowbite-react';
import {STATE_AUTH_PASSWORD_FORM} from "./enums/state.js";
import {Log} from "meteor/logging";

export const ForgottenPassword = ({onStateChange}) => {
  const emailRef = useRef();

  const handleState = () => {
    onStateChange(STATE_AUTH_PASSWORD_FORM.LOGIN);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      email: emailRef.current.value,
    };

    Accounts.forgotPassword({
      email: formData.email
    }, (error, response) => {
      Log.error(error);
    });
  };

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 className="text-center text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">Forgotten Password</h2>

      <div className="bg-white dark:bg-gray-900 py-8 px-4 mt-8 shadow sm:rounded-lg sm:px-10">
        <div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="mb-2">
              <div className="mb-2 block">
                <Label htmlFor="email" value="Email Address"/>
              </div>
              <TextInput id="email" type="email" ref={emailRef} required/>
            </div>
            <div>
              <Button type="submit" color="primary">Send</Button>
            </div>

            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet?
              <button className="font-medium hover:underline mx-1" onClick={() => handleState(STATE_AUTH_PASSWORD_FORM.LOGIN)}>Register</button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
