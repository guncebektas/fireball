import React from "react";
import {H2} from "../../../components/heading/Headings";
import {useTranslator} from "../../../providers/i18n";
import {Button} from 'flowbite-react';
import {FaHome, FaQuestionCircle, FaStar, FaInfoCircle} from 'react-icons/fa';
import {ROUTE} from "../../../../routes/enums/route";
import {useNavigate} from "react-router-dom";

export const Settings = () => {
  const t = useTranslator();
  const navigate = useNavigate();

  const buttons = [
    {
      icon: <FaHome className="text-xl mr-1"/>,
      text: t('Homepage'),
      color: 'blue',
      onClick: () => navigate(ROUTE.FAQS),
    },
    {
      icon: <FaQuestionCircle className="text-xl mr-1"/>,
      text: t('FAQs'),
      color: 'blue',
      onClick: () => navigate(ROUTE.FAQS),
    },
    {
      icon: <FaStar className="text-xl mr-1"/>,
      text: t('Wallet'),
      color: 'blue',
      onClick: () => navigate(ROUTE.CONTACT_FORM),
    },
    {
      icon: <FaInfoCircle className="text-xl mr-1"/>,
      text: t('About'),
      color: 'blue',
      onClick: () => navigate(ROUTE.CONTACT_FORM),
    }
  ];

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
