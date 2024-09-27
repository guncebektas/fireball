import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCog, faSuitcase, faUsers } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "flowbite-react";
import { isOrganizationEnabled } from "../../../../imports/modules/shared/functions/isOrganizationEnabled";
import {useTranslator} from "../../providers/i18n";

const DropdownItem = ({ icon, label }) => (
  <a
    href="#"
    className="block p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group"
  >
    <FontAwesomeIcon
      icon={icon}
      className="mx-auto mb-1 w-7 h-7 text-gray-400 group-hover:text-gray-500 dark:text-gray-400 dark:group-hover:text-gray-400"
    />
    <div className="text-sm text">{label}</div>
  </a>
);

export const HeaderOrganization = () => {
  const t = useTranslator();

  if (!isOrganizationEnabled()) {
    return null;
  }

  return (
    <Dropdown
      label={<FontAwesomeIcon icon={faSuitcase} className="header-dropdown-wrapper" />}
      arrowIcon={false}
      inline={true}
    >
      <Dropdown.Header>
        <span className="block text-sm">
          Organization
        </span>
      </Dropdown.Header>
      <div className="grid grid-cols-3 gap-4 p-4">
        <DropdownItem icon={faBell} label={t('Notifications')}/>
        <DropdownItem icon={faUsers} label={t('Users')}/>
        <DropdownItem icon={faCog} label={t('Settings')}/>
      </div>
    </Dropdown>
  );
};
