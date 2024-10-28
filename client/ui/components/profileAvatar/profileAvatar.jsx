import React from "react";
import {Avatar} from "flowbite-react";

export const ProfileAvatar = ({path}) => {
  if (!path) {
    return ''
  }

  return (<Avatar img={`https://ritapos-files.s3.eu-central-1.amazonaws.com/${path}`} alt="Avatar" className="mr-3" rounded/>);
};
