import React, {useState} from 'react';
import {Button} from "flowbite-react";
import {H2} from "../components/heading/Headings.jsx";
import {useTranslator} from "../providers/i18n";
import {Slider} from "../components/slider/Slider";

export const Hello = () => {
  const t = useTranslator();

  const {name, logo} = Meteor.settings.public.app;
  const {carousel} = Meteor.settings.public.pages.aboutUs;

  const welcomeMessage = `${t('Welcome to {$name}', {name: name})}!`

  return (
    <>
      <H2 text={welcomeMessage}/>

      <div className="mt-6 space-y-6">
        <div className="mb-3">
          <Slider carousel={carousel} showCaption={false}/>
        </div>

        <div className="mb-3">
          <Slider carousel={carousel} interval={5000} showCaption={false}/>
        </div>
      </div>
    </>
  );
};
