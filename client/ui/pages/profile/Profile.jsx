import React, { useState, useEffect } from 'react';
import { ProfileDetails } from "./ProfileDetails";
import { ProfilePicture } from "./ProfilePicture";
import { ProfileChangePassword } from "./ProfileChangePassword";
import { Profile2fa } from "./Profile2fa";
import { ProfileLocation } from "./ProfileLocation";
import { useTranslator } from "../../providers/i18n";

export const Profile = () => {
  const t = useTranslator();
  const [activeTab, setActiveTab] = useState('details');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="gap-3 mx-auto max-w-screen-xl dark:text-white relative">
      {/* Scrollable tab header */}
      <div className="overflow-x-auto relative">
        <ul id="tab-list" className="flex border-b space-x-4 w-full min-w-max mobile-glimpse">
          <li className="cursor-pointer">
            <button
              className={`py-2 px-4 ${activeTab === 'details' ? 'border-b-2 border-blue-500' : ''}`}
              onClick={() => handleTabChange('details')}
            >
              {t('Details')}
            </button>
          </li>
          <li className="cursor-pointer">
            <button
              className={`py-2 px-4 ${activeTab === 'picture' ? 'border-b-2 border-blue-500' : ''}`}
              onClick={() => handleTabChange('picture')}
            >
              {t('Picture')}
            </button>
          </li>
          <li className="cursor-pointer">
            <button
              className={`py-2 px-4 ${activeTab === 'changePassword' ? 'border-b-2 border-blue-500' : ''}`}
              onClick={() => handleTabChange('changePassword')}
            >
              {t('Change password')}
            </button>
          </li>
          <li className="cursor-pointer">
            <button
              className={`py-2 px-4 ${activeTab === '2fa' ? 'border-b-2 border-blue-500' : ''}`}
              onClick={() => handleTabChange('2fa')}
            >
              {t('2FA')}
            </button>
          </li>
          <li className="cursor-pointer">
            <button
              className={`py-2 px-4 ${activeTab === 'location' ? 'border-b-2 border-blue-500' : ''}`}
              onClick={() => handleTabChange('location')}
            >
              {t('Location')}
            </button>
          </li>
        </ul>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === 'details' && <ProfileDetails />}
        {activeTab === 'picture' && <ProfilePicture />}
        {activeTab === 'changePassword' && <ProfileChangePassword />}
        {activeTab === '2fa' && <Profile2fa />}
        {activeTab === 'location' && <ProfileLocation />}
      </div>
    </div>
  );
};
