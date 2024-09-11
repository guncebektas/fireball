import {Meteor} from "meteor/meteor";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGoogle} from "@fortawesome/free-brands-svg-icons";

export const LoginWithGoogle = () => {
  const handleGoogleLogin = () => {
    Meteor.loginWithGoogle({
      requestPermissions: ['email'],
      loginStyle: 'popup'
    });
  };

  return (
    <button type="button" className="mt-5 w-full flex justify-center py-1 px-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 google-btn" onClick={handleGoogleLogin}>
      Login with Google
      <FontAwesomeIcon icon={faGoogle}></FontAwesomeIcon>
    </button>
  );
};
