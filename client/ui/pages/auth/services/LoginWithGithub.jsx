import React from 'react';
import {Meteor} from 'meteor/meteor';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub} from "@fortawesome/free-brands-svg-icons/faGithub";
import {Button} from "flowbite-react";

export const LoginWithGithub = () => {
  const handleGithubLogin = () => {
    Meteor.loginWithGithub({
      requestPermissions: ['user'],
      loginStyle: 'popup',
    });
  };

  return (
    <Button color="blue" onClick={handleGithubLogin} fullSized>
      Login with Github
      <FontAwesomeIcon icon={faGithub}></FontAwesomeIcon>
    </Button>
  );
};
