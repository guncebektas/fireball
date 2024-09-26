import React from 'react';
import {Tabs} from "flowbite-react";
import {ProfileDetails} from "./ProfileDetails";
import {ProfilePicture} from "./ProfilePicture";
import {ProfileChangePassword} from "./ProfileChangePassword";
import {Profile2fa} from "./Profile2fa";
import {ProfileLocation} from "./ProfileLocation";
import {useTranslator} from "../../providers/i18n";

export const Profile = () => {
  const t = useTranslator();

  return (
    <div className="gap-3 mx-auto max-w-screen-xl dark:text-white">
      <Tabs.Group aria-label="Profile settings tabs" style="underline">
        <Tabs.Item active title={t('Details')}>
          <ProfileDetails/>
        </Tabs.Item>

        <Tabs.Item title={t('Picture')}>
          <ProfilePicture/>
        </Tabs.Item>

        <Tabs.Item title={t('Change password')}>
          <ProfileChangePassword/>
        </Tabs.Item>

        <Tabs.Item title={t('2FA')}>
          <Profile2fa/>
        </Tabs.Item>

        <Tabs.Item title={t('Location')}>
          <ProfileLocation/>
        </Tabs.Item>
      </Tabs.Group>
    </div>
  );
};
