import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell, faCog, faSuitcase, faUsers,} from "@fortawesome/free-solid-svg-icons";
import {isOrganizationEnabled} from "../../../../imports/modules/shared/functions/isOrganizationEnabled";

const DropdownItem = ({ icon, label }) => (
  <a
    href="#"
    className="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group"
  >
    <FontAwesomeIcon
      icon={icon}
      className="mx-auto mb-1 w-7 h-7 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400"
    />
    <div className="text-sm text-gray-900 dark:text-white">{label}</div>
  </a>
);

export const HeaderOrganization = () => {
  if (!isOrganizationEnabled()) {
    return;
  }

  return (
    <>
      <button
        type="button"
        data-dropdown-toggle="apps-dropdown"
        className="p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Your organization</span>
        <FontAwesomeIcon icon={faSuitcase} />
      </button>

      <div
        className="hidden overflow-hidden z-10 my-4 max-w-sm text-base list-none bg-white rounded divide-y divide-gray-100 shadow-lg dark:bg-gray-700 dark:divide-gray-600 rounded-xl"
        id="apps-dropdown"
      >
        <div
          className="block py-2 px-4 text-base font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-600 dark:text-gray-300"
        >
          Organization
        </div>
        <div className="grid grid-cols-3 gap-4 p-4">
          <DropdownItem icon={faBell} label="Notifications" />
          <DropdownItem icon={faUsers} label="Users" />
          <DropdownItem icon={faCog} label="Settings" />
        </div>
      </div>
    </>
  );
};
