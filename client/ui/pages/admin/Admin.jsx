import React from 'react';
import {H2} from "../../components/heading/Headings.jsx";
import {ROUTE} from "../../../routes/enums/route";
import {Button} from "flowbite-react";
import {useTranslator} from "../../providers/i18n";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {FaEnvelope} from "react-icons/fa";
import {useNavigate} from "react-router-dom";

export const Admin = () => {
  const t = useTranslator();
  const navigate = useNavigate();

  const handleNavigate = (route) => {
    navigate(route);
  };

  return (
    <>
      <H2 text="Admin"/>

      <div className="my-6">
        <Button
          onClick={() => handleNavigate(ROUTE.USER_PROFILES)}
          color="blue"
          className="w-full flex justify-start items-center mb-3"
        >
          <FontAwesomeIcon icon="user" className="text-xl mr-1"/>
          <span>{t('User profiles')}</span>
        </Button>
        <Button
          onClick={() => handleNavigate(ROUTE.CONTACT_REQUESTS)}
          color="blue"
          className="w-full flex justify-start items-center"
        >
          <FaEnvelope className="text-xl mr-1"/>
          <span>{t('Contact requests')}</span>
        </Button>
      </div>
    </>
  );
}
