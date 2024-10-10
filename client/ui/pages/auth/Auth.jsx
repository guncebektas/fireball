import React from 'react';
import {AuthToken} from "./passwordless/AuthToken.jsx";
import {AuthPassword} from "./password/AuthPassword.jsx";

export const Auth = () => {
  const {isPasswordlessLoginEnabled} = Meteor.settings.public;

  if (isPasswordlessLoginEnabled) {
    return (<AuthToken/>);
  }

  return (<AuthPassword/>);
};
