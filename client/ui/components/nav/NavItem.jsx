import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";

export const NavItem = ({text, link, icon}) => {
  return (
    <Link to={link} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
      <FontAwesomeIcon
        icon={icon}
        className="w-6 h-5 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
      />

      <span className="ml-3">{text}</span>
    </Link>
  );
};
