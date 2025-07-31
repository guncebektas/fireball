import React from 'react';
import {Button} from 'flowbite-react';
import {H2} from '../../components/heading/Headings.jsx';
import {useTranslator} from "../../providers/i18n";
import {userProfilesMethods} from "../../../../imports/modules/app/user/userProfiles/userProfileMethod";

export const ProfileDeleteMyAccount = () => {
  const t = useTranslator();

  const handleSubmit = (e) => {
    e.preventDefault();

    userProfilesMethods.deleteMyAccount()
  };

  return (
    <>
      <div className="my-3">
        <H2 text="Delete my account"/>
      </div>

      <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
        <Button type="submit" color="primary">{t('Delete')}</Button>
      </form>
    </>
  );
};
