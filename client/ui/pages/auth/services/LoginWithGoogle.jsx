import {Meteor} from "meteor/meteor";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGoogle} from "@fortawesome/free-brands-svg-icons";
import {Button} from "flowbite-react";

export const LoginWithGoogle = () => {
  const handleGoogleLogin = () => {
    Meteor.loginWithGoogle({
      requestPermissions: ['email'],
      loginStyle: 'popup'
    });
  };

  return (
    <Button color="blue" className={'mb-1'} onClick={handleGoogleLogin} fullSized>
      Login with Google
      <FontAwesomeIcon icon={faGoogle}></FontAwesomeIcon>
    </Button>
  );
};
