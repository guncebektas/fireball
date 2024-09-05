import React from 'react';
import {Tabs} from "flowbite-react";
import {ProfileDetails} from "./ProfileDetails";
import {Profile2fa} from "./Profile2fa";
import {ProfileLocation} from "./ProfileLocation";
import {ProfileChangePassword} from "./ProfileChangePassword";

export const Profile = () => {
  return (
    <div className="gap-3 mx-auto max-w-screen-xl dark:text-white">
      <Tabs.Group aria-label="Profile settings tabs" style="underline">
        <Tabs.Item active title="Details">
          <ProfileDetails/>
        </Tabs.Item>

        <Tabs.Item title="Change password">
          <ProfileChangePassword/>
        </Tabs.Item>

        <Tabs.Item title="2FA">
          <Profile2fa/>
        </Tabs.Item>

        <Tabs.Item title="Location">
          <ProfileLocation/>
        </Tabs.Item>
      </Tabs.Group>
    </div>
  );
};
