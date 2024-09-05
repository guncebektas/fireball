import React from "react";
import {Link} from "react-router-dom";

export const NavItemDeep = ({text, link}) => {
  return (
    <Link to={link} className="flex items-center p-2 pl-11 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">{text}</Link>
  );
};
