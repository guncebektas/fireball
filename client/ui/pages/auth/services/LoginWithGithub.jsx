import React from 'react';
import {Meteor} from 'meteor/meteor';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub} from "@fortawesome/free-brands-svg-icons/faGithub";
import {Button} from "flowbite-react";
import {useTranslator} from "../../../providers/i18n";

export const LoginWithGithub = () => {
  const t = useTranslator();

  const handleGithubLogin = () => {
    Meteor.loginWithGithub({
      requestPermissions: ['user'],
      loginStyle: 'redirect',
    });
  };

  return (
    <Button color="blue" onClick={handleGithubLogin} fullSized>
      <FontAwesomeIcon icon={faGithub}></FontAwesomeIcon>
      {t('Login with Github')}
    </Button>
  );
};
