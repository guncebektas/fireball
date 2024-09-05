import React from "react";
import {Link} from "react-router-dom";

export const HeaderLogo = () => {
  const {appName, appLogo} = Meteor.settings.public;

  return (
    <Link to="/" className="flex items-center justify-between mr-4">
      <div>
        <img src={appLogo} alt={appName}/>
      </div>
      <span className="hidden md:block self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
        {appName}
      </span>
    </Link>);
};
