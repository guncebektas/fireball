import React from "react";
import {Link} from "react-router-dom";

export const HeaderLogo = () => {
  const {name, logo} = Meteor.settings.public.app;

  return (
    <Link to="/" className="flex items-center justify-between mr-4">
      <div>
        <img src={logo} alt={name}/>
      </div>
      <span className="hidden md:block self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
        {name}
      </span>
    </Link>);
};
