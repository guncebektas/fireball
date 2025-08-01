import React, {useState} from 'react';
import {ProfileDetails} from "./ProfileDetails";
import {ProfilePicture} from "./ProfilePicture";
import {ProfileChangePassword} from "./ProfileChangePassword";
import {Profile2fa} from "./Profile2fa";
import {ProfileLocation} from "./ProfileLocation";
import {useTranslator} from "../../providers/i18n";
import {ProfilePreferences} from "./ProfilePreferences";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Button, Dropdown} from "flowbite-react";
import {Meteor} from "meteor/meteor";
import {ROUTE} from "../../../routes/enums/route";
import {useNavigate} from "react-router-dom";
import {faRightFromBracket, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {ProfileDeleteMyAccount} from "./ProfileDeleteMyAccount";

export const Profile = () => {
  const t = useTranslator();
  const [activeTab, setActiveTab] = useState('details');

  const tabs = [
    {id: 'details', label: t('Details'), component: <ProfileDetails/>},
    {id: 'preferences', label: t('Preferences'), component: <ProfilePreferences/>},
    {id: 'picture', label: t('Picture'), component: <ProfilePicture/>},
    {id: 'changePassword', label: t('Change password'), component: <ProfileChangePassword/>},
    {id: '2fa', label: t('2FA'), component: <Profile2fa/>},
    {id: 'location', label: t('Location'), component: <ProfileLocation/>},
    {id: 'deleteMyAccount', label: t('Delete my account'), component: <ProfileDeleteMyAccount/>},
  ];

  const TabButton = ({id, label}) => (
    <li className="cursor-pointer">
      <button
        className={`py-2 px-4 ${activeTab === id ? 'border-b-2 border-primary-600' : ''}`}
        onClick={() => setActiveTab(id)}
      >
        {label}
      </button>
    </li>
  );

  const navigate = useNavigate();
  const handleLogout = () => {
    Meteor.logout();
    navigate(ROUTE.HOME);
    location.reload();
  };

  return (
    <div className="gap-3 mx-auto max-w-screen-xl dark:text-white relative">
      <div className="overflow-x-auto relative">
        <ul id="tab-list" className="flex border-b space-x-4 w-full min-w-max mobile-glimpse">
          {tabs.map((tab) => (
            <TabButton key={tab.id} id={tab.id} label={tab.label}/>
          ))}
        </ul>
      </div>

      {/* Tab Content */}
      <div className="my-4">
        {tabs.find((tab) => tab.id === activeTab)?.component}
      </div>

      <div className={'flex max-w-md flex-col gap-4'}>
        <Button type="button" color="secondary" onClick={handleLogout} className={'mb-6'}>
          <FontAwesomeIcon icon={faRightFromBracket} className="mr-2"/>
          {t('Logout')}
        </Button>
      </div>
    </div>
  );
};
