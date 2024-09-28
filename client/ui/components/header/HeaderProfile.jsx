import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Meteor} from "meteor/meteor";
import {useTracker} from "meteor/react-meteor-data";
import {Link, useNavigate} from "react-router-dom";
import {Dropdown} from "flowbite-react";
import {USER_PROFILE_PUBLICATION} from "../../../../imports/modules/userProfiles/enums/publication.js";
import {userProfileRepository} from "../../../../imports/modules/userProfiles/userProfileRepository.js";
import {ROUTE} from "../../../routes/enums/route.js";
import {useTranslator} from "../../providers/i18n";

export const HeaderProfile = () => {
  const navigate = useNavigate();
  const t = useTranslator();

  const showDevTools = Meteor.settings.public.showDevTools;

  const [formData, setFormData] = useState({
    email: '',
    firstname: '',
    lastname: '',
  });

  const user = useTracker(() => Meteor.user(), []);

  useTracker(() => {
    const handle = Meteor.subscribe(USER_PROFILE_PUBLICATION.ME);

    if (handle.ready()) {
      const me = userProfileRepository.findOne({_id: Meteor.userId()}) || {};
      let email = user?.emails?.length > 0 ? user?.emails[0]?.address : '';

      setFormData({
        email: email,
        firstname: me.firstname || '',
        lastname: me.lastname || '',
      });
    }
  }, [user]);

  const handleLogout = () => {
    Meteor.logout();
    navigate(ROUTE.HOME);
    location.reload();
  };

  return (
    <Dropdown
      arrowIcon={false}
      inline={true}
      label={<FontAwesomeIcon icon="user" className="header-dropdown-wrapper"/>}
    >
      <Dropdown.Header>
        <span className="block text-sm">
          {formData.firstname} {formData.lastname}
        </span>
        <span className="block text-sm font-medium truncate">
          {formData.email}
        </span>
      </Dropdown.Header>

      <Dropdown.Item className="hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-white">
        <Link to={ROUTE.PROFILE}>
          <FontAwesomeIcon icon="user" className="mr-2"/>
          {t('My profile')}
        </Link>
      </Dropdown.Item>

      <Dropdown.Item className="hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-white">
        <Link to={ROUTE.PROFILE}>
          <FontAwesomeIcon icon="heart" className="mr-2"/>
          {t('My favorites')}
        </Link>
      </Dropdown.Item>

      {
        showDevTools ?
          <Dropdown.Item className="hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-white">
            <a href="https://github.com" className="flex items-center">
              <FontAwesomeIcon icon="code-merge" className="mr-2"/>
              Github
            </a>
          </Dropdown.Item> : ''
      }

      {
        showDevTools ?
          <Dropdown.Item className="hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-white">
            <a href="https://meteor.com/" target="_blank" className="flex items-center">
              <FontAwesomeIcon icon="meteor" className="mr-2"/>
              Meteor.js
            </a>
          </Dropdown.Item> : ''
      }

      {
        showDevTools ?
          <Dropdown.Item className="hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-white">
            <a href="https://flowbite.com/" target="_blank" className="flex items-center">
              <FontAwesomeIcon icon="pen-ruler" className="mr-2"/>
              Flowbite
            </a>
          </Dropdown.Item> : ''
      }


      <Dropdown.Divider className="border-gray-200 dark:border-gray-600"/>

      <Dropdown.Item onClick={handleLogout} className="hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-white">
        <FontAwesomeIcon icon="right-from-bracket" className="mr-2"/>
        {t('Logout')}
      </Dropdown.Item>
    </Dropdown>
  );
};
