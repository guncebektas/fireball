import React from 'react';
import {AuthToken} from "./passwordless/AuthToken.jsx";
import {AuthPassword} from "./password/AuthPassword.jsx";

export const Auth = () => {
  const isPasswordless = Meteor.settings.public.isPasswordlessLoginEnabled;

  if (isPasswordless) {
    return (<AuthToken/>);
  }

  return (<AuthPassword/>);
};
