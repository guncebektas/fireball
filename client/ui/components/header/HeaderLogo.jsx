import React from "react";
import {Link} from "react-router-dom";
import {ROUTE} from "../../../routes/enums/route";

export const HeaderLogo = () => {
  const {name, logo} = Meteor.settings.public.app;

  return (
    <Link to={ROUTE.HOME} className="flex items-center justify-between mr-4">
      <div>
        <img src={logo} alt={name} className="mr-3" style={{'width': 'auto', 'height': '24px'}}/>
      </div>
    </Link>
  );
};