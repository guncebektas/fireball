import React from "react";
import {H2} from "../../../components/heading/Headings";
import {useTranslator} from "../../../providers/i18n";
import {Button} from 'flowbite-react';
import {FaClipboardList, FaEnvelope, FaHome, FaInfoCircle, FaQuestionCircle} from 'react-icons/fa';
import {ROUTE} from "../../../../routes/enums/route";
import {useNavigate} from "react-router-dom";

export const Settings = () => {
  const t = useTranslator();
  const navigate = useNavigate();

  const buttons = [{
    icon: <FaHome className="text-xl mr-1"/>,
    text: t('Homepage'),
    color: 'blue',
    onClick: () => navigate(ROUTE.FAQS),
  }, {
    icon: <FaQuestionCircle className="text-xl mr-1"/>,
    text: t('FAQs'),
    color: 'blue',
    onClick: () => navigate(ROUTE.SETTINGS_FAQS_LIST),
  }, {
    icon: <FaEnvelope className="text-xl mr-1"/>,
    text: t('Contact requests'),
    color: 'blue',
    onClick: () => navigate(ROUTE.SETTINGS_CONTACT_REQUESTS_LIST),
  }, {
    icon: <FaClipboardList className="text-xl mr-1"/>,
    text: t('Tickets'),
    color: 'blue',
    onClick: () => navigate(ROUTE.SETTINGS_TICKETS_LIST),
  }, {
    icon: <FaInfoCircle className="text-xl mr-1"/>,
    text: t('About us'),
    color: 'blue',
    onClick: () => navigate(ROUTE.SETTINGS_ABOUT_US),
  }];

  return (
    <>
      <H2 text={t('Settings')}/>

      {buttons.map((button, index) => (
        <div key={index} className="my-6">
          <Button
            onClick={button.onClick}
            color={button.color}
            gradientDuoTone={button.gradient || undefined}
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
