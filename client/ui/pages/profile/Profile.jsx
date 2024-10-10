import React, { useState } from 'react';
import { ProfileDetails } from "./ProfileDetails";
import { ProfilePicture } from "./ProfilePicture";
import { ProfileChangePassword } from "./ProfileChangePassword";
import { Profile2fa } from "./Profile2fa";
import { ProfileLocation } from "./ProfileLocation";
import { useTranslator } from "../../providers/i18n";
import { ProfilePreferences } from "./ProfilePreferences";

export const Profile = () => {
  const t = useTranslator();
  const [activeTab, setActiveTab] = useState('details');

  const tabs = [
    { id: 'details', label: t('Details'), component: <ProfileDetails /> },
    { id: 'preferences', label: t('Preferences'), component: <ProfilePreferences /> },
    { id: 'picture', label: t('Picture'), component: <ProfilePicture /> },
    { id: 'changePassword', label: t('Change password'), component: <ProfileChangePassword /> },
    { id: '2fa', label: t('2FA'), component: <Profile2fa /> },
    { id: 'location', label: t('Location'), component: <ProfileLocation /> },
  ];

  const TabButton = ({ id, label }) => (
    <li className="cursor-pointer">
      <button
        className={`py-2 px-4 ${activeTab === id ? 'border-b-2 border-blue-500' : ''}`}
        onClick={() => setActiveTab(id)}
      >
        {label}
      </button>
    </li>
  );

  return (
    <div className="gap-3 mx-auto max-w-screen-xl dark:text-white relative">
      <div className="overflow-x-auto relative">
        <ul id="tab-list" className="flex border-b space-x-4 w-full min-w-max mobile-glimpse">
          {tabs.map((tab) => (
            <TabButton key={tab.id} id={tab.id} label={tab.label} />
          ))}
        </ul>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {tabs.find((tab) => tab.id === activeTab)?.component}
      </div>
    </div>
  );
};
