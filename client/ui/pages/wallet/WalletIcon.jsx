import React from 'react';
import {faStar} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const WalletIcon = () => {
  const {name, logo} = Meteor.settings.public.app;

  return (
    <FontAwesomeIcon icon={faStar} className="m-text mr-1"/>
  );
};
