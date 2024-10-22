import React from "react";
import {H2} from "../../components/heading/Headings";
import {useTranslator} from "../../providers/i18n";
import {Button} from 'flowbite-react';
import {FaQuestionCircle, FaEnvelope, FaWhatsapp, FaInfoCircle, FaClipboardList} from 'react-icons/fa';
import {ROUTE} from "../../../routes/enums/route";
import {useNavigate} from "react-router-dom";
import {NavItem} from "../../components/nav/NavItem";

export const Help = () => {
  const t = useTranslator();
  const navigate = useNavigate();
  const whatsappNumber = '1234567890';

  const buttons = [{
    icon: <FaQuestionCircle className="text-xl mr-1"/>,
    text: t('FAQs'),
    color: 'success',
    onClick: () => navigate(ROUTE.FAQS),
  }, {
    icon: <FaEnvelope className="text-xl mr-1"/>,
    text: t('Contact us'),
    color: 'success',
    onClick: () => navigate(ROUTE.CONTACT_FORM),
  }, {
    icon: <FaClipboardList className="text-xl mr-1"/>,
    text: t('Send your requests'),
    color: 'success',
    onClick: () => navigate(ROUTE.TICKETS_FORM),
  }, {
    icon: <FaWhatsapp className="text-xl mr-1"/>,
    text: t('Chat with us on WhatsApp'),
    gradient: 'greenToBlue',
    onClick: () => window.open(`https://wa.me/${whatsappNumber}`, '_blank'),
  }];

  return (
    <>
      <H2 text={t('Help & Support')}/>

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
