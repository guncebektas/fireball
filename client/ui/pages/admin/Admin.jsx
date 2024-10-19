import React from 'react';
import {H2} from "../../components/heading/Headings";
import {useTranslator} from "../../providers/i18n";
import {Button} from "flowbite-react";
import {FaUser, FaEnvelope, FaBug} from 'react-icons/fa';
import {ROUTE} from "../../../routes/enums/route";
import {useNavigate} from "react-router-dom";
import {sendSimpleEmail} from "../../../../imports/modules/infrastructure/email/email.methods";

export const Admin = () => {
  const t = useTranslator();
  const navigate = useNavigate();

  const buttons = [{
    icon: <FaUser className="text-xl mr-1"/>,
    text: t('User profiles'),
    color: 'blue',
    onClick: () => navigate(ROUTE.USER_PROFILES),
  }, {
    icon: <FaEnvelope className="text-xl mr-1"/>,
    text: t('Contact requests'),
    color: 'blue',
    onClick: () => navigate(ROUTE.CONTACT_REQUESTS),
  }, {
    icon: <FaBug className="text-xl mr-1"/>,
    text: t('Send an email'),
    color: 'gray',
    onClick: async () => await sendSimpleEmail({
      to: 'info@ritapos.com',
      subject: 'subject',
      message: 'text'
    }),
  }];

  return (
    <>
      <H2 text={t('Admin')}/>

      {buttons.map((button, index) => (
        <div key={index} className="my-6">
          <Button
            onClick={button.onClick}
            color={button.color}
            className="w-full flex justify-start items-center mb-3"
          >
            {button.icon}
            <span>{button.text}</span>
          </Button>
        </div>
      ))}
    </>
  );
};
