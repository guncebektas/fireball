import React from 'react';
import { Meteor } from 'meteor/meteor';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub} from "@fortawesome/free-brands-svg-icons/faGithub";

export const LoginWithGithub = () => {
  const handleGithubLogin = () => {
    Meteor.loginWithGithub({
      requestPermissions: ['user'],
      loginStyle: 'popup',
    });
  };

  return (
    <button type="button" className="mt-5 w-full flex justify-center py-1 px-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 github-btn" onClick={handleGithubLogin}>
      Login with Github
      <FontAwesomeIcon icon={faGithub}></FontAwesomeIcon>
    </button>
)
  ;
};
