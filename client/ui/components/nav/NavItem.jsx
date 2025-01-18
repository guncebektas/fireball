import React from "react";
import {Link} from "react-router-dom";
import {useAppStore} from "../../stores/useAppStore";
import {Icon} from "../icon/Icon";

export const NavItem = ({link, icon, text}) => {
  const {closeSidebar} = useAppStore();

  const handleClick = () => {
    if (window.innerWidth <= 768) {
      closeSidebar();
    }
  };


  return (
    <Link to={link} onClick={handleClick} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800">
      <Icon icon={icon} />

      <span className="ml-3">{text}</span>
    </Link>
  );
};
