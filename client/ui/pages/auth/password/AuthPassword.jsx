import React, {useState} from 'react';
import {STATE_AUTH_PASSWORD_FORM} from "./enums/state.js";
import {Login} from "./Login.jsx";
import {Register} from "./Register.jsx";
import {ForgottenPassword} from "./ForgottenPassword.jsx";

export const AuthPassword = () => {
  const [isState, setState] = useState(STATE_AUTH_PASSWORD_FORM.LOGIN);

  const handleStateChange = (newValue) => {
    setState(newValue);
  };

  switch (isState) {
    case STATE_AUTH_PASSWORD_FORM.REGISTER:
      return (<Register onStateChange={handleStateChange}/>);
    case STATE_AUTH_PASSWORD_FORM.FORGOTTEN_PASSWORD:
      return (<ForgottenPassword onStateChange={handleStateChange}/>);
    default:
      return (<Login onStateChange={handleStateChange}/>);
  }
};
