import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Meteor} from "meteor/meteor";
import {useTracker} from "meteor/react-meteor-data";
import {Link} from "react-router-dom";
import {PROFILE_PUBLICATION} from "../../../../imports/modules/profiles/enums/publication.js";
import {profileRepository} from "../../../../imports/modules/profiles/profileRepository.js";
import {ROUTE} from "../../../routes/enums/route.js";

export const HeaderProfile = () => {
  const [formData, setFormData] = useState({
    email: '',
    firstname: '',
    lastname: '',
  });

  const user = useTracker(() => Meteor.user(), []);

  useTracker(() => {
    const handle = Meteor.subscribe(PROFILE_PUBLICATION.ME);
    if (handle.ready()) {
      const me = profileRepository.findOne({_id: Meteor.userId()}) || {};
      let email  = user?.emails?.length > 0 ? user?.emails[0]?.address : '';

      setFormData({
        email: email,
        firstname: me.firstname || '',
        lastname: me.lastname || '',
      });
    }
  }, [user]);

  const handleLogout = () => {
    Meteor.logout();
  };

  return (
    <>
      <button
        type="button"
        className="p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
        id="user-menu-button"
        aria-expanded="false"
        data-dropdown-toggle="dropdown"
      >
        <span className="sr-only">Open user menu</span>
        <FontAwesomeIcon icon="user"/>
      </button>

      <div
        className="hidden z-50 my-4 w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 rounded-xl"
        id="dropdown"
      >
        <div className="py-3 px-4">
          <span
            className="block text-sm font-semibold text-gray-900 dark:text-white"
          >
            {formData.firstname} {formData.lastname}
          </span>
          <span
            className="block text-sm text-gray-900 truncate dark:text-white"
          >
            {formData.email}
          </span>
        </div>
        <ul
          className="py-1 text-gray-700 dark:text-gray-300"
          aria-labelledby="dropdown"
        >
          <li>
            <Link
              to={ROUTE.PROFILE}
              className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">
              My profile
            </Link>
          </li>
        </ul>
        <ul
          className="py-1 text-gray-700 dark:text-gray-300"
          aria-labelledby="dropdown"
        >
          <li>
            <a
              href="https://github.com"
              className="flex items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <FontAwesomeIcon icon="code-merge"/> Github</a
            >
          </li>
          <li>
            <a
              href="https://meteor.com/"
              target="_blank"
              className="flex justify-between items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <span className="flex items-center">
                <FontAwesomeIcon icon="meteor"/>
                Meteor.js
              </span>
            </a>
          </li>
          <li>
            <a
              href="https://flowbite.com/"
              target="_blank"
              className="flex justify-between items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <span className="flex items-center">
                <FontAwesomeIcon icon="pen-ruler"/>
                Flowbite
              </span>
            </a>
          </li>
        </ul>
        <ul
          className="py-1 text-gray-700 dark:text-gray-300"
          aria-labelledby="dropdown"
        >
          <li>
            <a
              href="#"
              className="flex justify-between items-center py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={handleLogout}
            >
              Logout
            </a>
          </li>
        </ul>
      </div>
    </>);
};
