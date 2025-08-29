import { Button } from 'flowbite-react';
import React from "react";
import { FaClipboardList, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { ROUTE } from "../../../routes/enums/route";
import { H2 } from "../../components/heading/Headings";
import { Icon } from "../../components/icon/Icon";
import { useTranslator } from "../../providers/i18n";

export const Help = () => {
  const t = useTranslator();
  const navigate = useNavigate();
  const whatsappNumber = Meteor.settings.public.app.whatsapp;

  const buttons = [{
    icon: <Icon icon="question-circle" className="text-xl mr-1"/>,
    text: t('FAQs'),
    color: 'secondary',
    onClick: () => navigate(ROUTE.FAQS),
  }, {
    icon: <Icon icon="envelope" className="text-xl mr-1"/>,
    text: t('Contact us'),
    color: 'primary',
    onClick: () => navigate(ROUTE.CONTACT_FORM),
  }, {
    icon: <Icon icon="clipboard-list" className="text-xl mr-1"/>,
    text: t('Send your requests'),
    color: 'primary',
    onClick: () => navigate(ROUTE.TICKETS_FORM),
  }, {
    icon: <Icon icon="whatsapp" className="text-xl mr-1"/>,
    text: t('Chat with us on WhatsApp'),
    color: 'primary',
    onClick: () => window.open(`https://wa.me/${whatsappNumber}`, '_blank'),
  }];

  return (
    <>
      <H2 text={t('Help & Support')} showBackButton={true}/>

      {buttons.map((button, index) => (
        <div key={index} className="my-6">
          <Button
            onClick={button.onClick}
            color={button.color}
            gradientDuoTone={button.gradient || undefined}
            className="w-full flex justify-start items-center"
          >
            {button.icon}
            <span>{button.text}</span>
          </Button>
        </div>
      ))}
    </>
  );
};
