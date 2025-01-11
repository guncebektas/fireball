import React from "react";
import {Link} from "react-router-dom";
import {useAppStore} from "../../stores/useAppStore";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const NavItem = ({link, icon, text}) => {
  const {customIcons} = Meteor.settings.public.app;

  const {closeSidebar} = useAppStore();

  const handleClick = () => {
    if (window.innerWidth <= 768) {
      closeSidebar();
    }
  };


  return (
    <Link to={link} onClick={handleClick} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
      {customIcons[icon] ?
        <svg className="svg-inline--fa fa-life-ring w-6 h-5 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
          <use href={`#${icon}`}/>
        </svg>
        :
        <FontAwesomeIcon
          icon={icon}
          className="w-6 h-5 text-gray-400 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
        />
      }

      <span className="ml-3">{text}</span>
    </Link>
  );
};
