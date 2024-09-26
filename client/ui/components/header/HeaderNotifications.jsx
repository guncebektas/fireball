import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown, Avatar } from "flowbite-react";
import {useTranslator} from "../../providers/i18n";

export const HeaderNotifications = () => {
  const t = useTranslator();

  return (
    <Dropdown
      label={<FontAwesomeIcon icon="bell" className="header-dropdown-wrapper"/>}
      arrowIcon={false}
      inline={true}
    >
      <Dropdown.Header>
        <span className="block text-sm">
          {t('Notifications')}
        </span>
      </Dropdown.Header>
      <Dropdown.Item>
        <div className="flex py-3">
          <Avatar
            img="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
            rounded={true}
            status="online"
          />
          <div className="pl-3 w-full">
            <div className="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
              New message from
              <span className="font-semibold text-gray-900 dark:text-white"> Bonnie Green</span>: "Hey, what's up? All set for the presentation?"
            </div>
            <div className="text-xs font-medium text-primary-600 dark:text-primary-500">
              a few moments ago
            </div>
          </div>
        </div>
      </Dropdown.Item>
      <Dropdown.Item>
        <div className="flex py-3">
          <Avatar
            img="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
            rounded={true}
            status="busy"
          />
          <div className="pl-3 w-full">
            <div className="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
              <span className="font-semibold text-gray-900 dark:text-white"> Jese Leos</span> and{" "}
              <span className="font-medium text-gray-900 dark:text-white">5 others</span> started following you.
            </div>
            <div className="text-xs font-medium text-primary-600 dark:text-primary-500">
              10 minutes ago
            </div>
          </div>
        </div>
      </Dropdown.Item>
      <Dropdown.Item>
        <div className="flex py-3">
          <Avatar
            img="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/joseph-mcfall.png"
            rounded={true}
            status="online"
          />
          <div className="pl-3 w-full">
            <div className="text-gray-500 font-normal text-sm mb-1.5 dark:text-gray-400">
              <span className="font-semibold text-gray-900 dark:text-white">Joseph McFall</span> and{" "}
              <span className="font-medium text-gray-900 dark:text-white">141 others</span> love your story. See it and view more stories.
            </div>
            <div className="text-xs font-medium text-primary-600 dark:text-primary-500">
              44 minutes ago
            </div>
          </div>
        </div>
      </Dropdown.Item>
      <Dropdown.Divider/>
      <Dropdown.Item>
        <div className="text-center text-primary-600 dark:text-primary-500 hover:underline">
          {t('View all')}
        </div>
      </Dropdown.Item>
    </Dropdown>
  );
};
