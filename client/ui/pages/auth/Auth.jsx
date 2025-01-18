import React from 'react';
import { useLocation } from "react-router-dom";
import { AuthPassword } from "./password/AuthPassword.jsx";
import { ResetPassword } from "./password/ResetPassword";
import { AuthToken } from "./passwordless/AuthToken.jsx";

export const Auth = () => {
  const {isPasswordlessLoginEnabled} = Meteor.settings.public;

  const location = useLocation();
  if (location.pathname.includes('reset-password')) {
    return (<ResetPassword/>);
  }

  if (isPasswordlessLoginEnabled) {
    return (<AuthToken/>);
  }

  return (<AuthPassword/>);
};
