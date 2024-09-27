import React from "react";
import {H2} from "../../components/heading/Headings";
import {useTranslator} from "../../providers/i18n";
import {Button} from 'flowbite-react';
import {FaQuestionCircle, FaEnvelope, FaWhatsapp} from 'react-icons/fa';
import {ROUTE} from "../../../routes/enums/route";
import {useNavigate} from "react-router-dom";

export const Help = () => {
  const t = useTranslator();
  const navigate = useNavigate();

  const whatsappNumber = '1234567890';

  const handleNavigate = (route) => {
    navigate(route);
  };

  return (
    <>
      {/* Heading */}
      <H2 text={t('Help & Support')}/>

      {/* FAQs Button */}
      <div className="my-6">
        <Button
          onClick={() => handleNavigate(ROUTE.FAQS)}
          color="success"
          className="w-full flex justify-start items-center"
        >
          <FaQuestionCircle className="text-xl mr-1"/>
          <span>{t('FAQs')}</span>
        </Button>
      </div>

      <div className="my-6">
        <Button
          onClick={() => handleNavigate(ROUTE.CONTACT_FORM)}
          color="success"
          className="w-full flex justify-start items-center"
        >
          <FaEnvelope className="text-xl mr-1"/>
          <span>{t('Contact us')}</span>
        </Button>
      </div>

      <div className="my-6">
        <Button
          onClick={() => window.open(`https://wa.me/${whatsappNumber}`, '_blank')}
          gradientDuoTone="greenToBlue"
          className="w-full flex justify-start items-center"
        >
          <FaWhatsapp className="text-xl mr-1"/>
          <span>{t('Chat with us on WhatsApp')}</span>
        </Button>
      </div>
    </>
  );
};
