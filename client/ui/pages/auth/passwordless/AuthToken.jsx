import React, {useState} from 'react';
import {RequestToken} from "./RequestToken.jsx";
import {EnterToken} from "./EnterToken.jsx";

export const AuthToken = () => {
  const [isRequesting, setIsRequesting] = useState(true);

  const handleStateChange = (newValue) => {
    setIsRequesting(newValue);
  };

  if (isRequesting) {
    return (<RequestToken onStateChange={handleStateChange}/>);
  }

  return (<EnterToken onStateChange={handleStateChange}/>);
};
