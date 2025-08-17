import {Meteor} from "meteor/meteor";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faApple} from "@fortawesome/free-brands-svg-icons";
import {Button} from "flowbite-react";
import {useTranslator} from "../../../providers/i18n";

export const LoginWithApple = () => {
  const t = useTranslator();

  const handleAppleLogin = () => {
    Meteor.loginWithApple({
      requestPermissions: ['name', 'email']
    });
  };

  return (
    <Button color="blue" className={'mb-1'} onClick={handleAppleLogin} fullSized>
      <FontAwesomeIcon icon={faApple}></FontAwesomeIcon>
      {t('Login with Apple')}
    </Button>
  );
};
