import React from 'react';
import {AuthToken} from "./passwordless/AuthToken.jsx";
import {AuthPassword} from "./password/AuthPassword.jsx";

export const Auth = () => {
  const isPasswordless = false;

  if (isPasswordless) {
    return (<AuthToken/>);
  }

  return (<AuthPassword/>);
};
