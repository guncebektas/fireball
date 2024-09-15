import {Meteor} from "meteor/meteor";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGoogle} from "@fortawesome/free-brands-svg-icons";
import {Button} from "flowbite-react";
import {useTranslator} from "../../../providers/i18n";

export const LoginWithGoogle = () => {
  const t = useTranslator();

  const handleGoogleLogin = () => {
    Meteor.loginWithGoogle({
      requestPermissions: ['email'],
      loginStyle: 'popup'
    });
  };

  return (
    <Button color="blue" className={'mb-1'} onClick={handleGoogleLogin} fullSized>
      <FontAwesomeIcon icon={faGoogle}></FontAwesomeIcon>
      {t('Login with Google')}
    </Button>
  );
};
