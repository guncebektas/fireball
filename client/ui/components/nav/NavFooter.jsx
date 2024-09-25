import React, {useState} from "react";
import {Tooltip} from 'flowbite-react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Link} from 'react-router-dom';
import {ROUTE} from "../../../routes/enums/route.js";
import {useUserId} from 'meteor/react-meteor-accounts';
import {ROLE_SCOPE} from "../../../../imports/modules/shared/enums/roleScope";
import {Roles} from 'meteor/alanning:roles';
import {useTracker} from 'meteor/react-meteor-data';

export const NavFooter = () => {
  const userId = useUserId();
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useTracker(() => {
    const userRoles = Roles.getRolesForUser(userId, ROLE_SCOPE.USER);

    setRoles(userRoles);
    setIsLoading(false);
  }, [userId]);

  // If still loading, you can choose to render nothing or a loading indicator
  if (isLoading) return null;

  const links = [
    // Only add the Admin link if the user has the 'admin' role
    ...(roles.includes("admin") ? [{
      to: ROUTE.ADMIN,
      icon: "user-tie",
      tooltip: "Admin",
      tooltipId: "tooltip-admin",
    }] : []),
    {
      to: ROUTE.SETTINGS,
      icon: "cog",
      tooltip: "Settings",
      tooltipId: "tooltip-settings",
    }
  ];

  return (
    <div className="absolute bottom-0 left-0 w-full flex justify-center p-4 space-x-4 bg-white dark:bg-gray-800">
      {links.map(({ to, icon, tooltip, tooltipId }) => (
        <Link
          key={tooltipId}
          to={to}
          data-tooltip-target={tooltipId}
          className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer dark:text-gray-400 dark:hover:text-white hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <FontAwesomeIcon icon={icon} />
          <Tooltip content={tooltip} placement="top" id={tooltipId} />
        </Link>
      ))}
    </div>
  );
};
