import React from 'react';
import {Button} from 'flowbite-react';
import {H2} from '../../components/heading/Headings.jsx';
import {useTranslator} from "../../providers/i18n";
import {userProfilesMethods} from "../../../../imports/modules/app/user/userProfiles/userProfileMethod";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const ProfileDeleteMyAccount = () => {
  const t = useTranslator();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await withReactContent(Swal).fire({
      title: t('Warning'),
      text: `${t('Are you sure')}?`,
      icon: 'warning',
      showCloseButton: true,
      showCancelButton: true,
      cancelButtonText: t('Cancel'),
      confirmButtonText: t('Confirm'),
      preConfirm: async () => {
        await userProfilesMethods.deleteMyAccount()
      },
    })
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
