import React from 'react';
import {AuthToken} from "./passwordless/AuthToken.jsx";
import {AuthPassword} from "./password/AuthPassword.jsx";
import {useLocation, useParams} from "react-router-dom";
import {ResetPassword} from "./password/ResetPassword";

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
