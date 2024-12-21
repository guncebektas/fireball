import React from 'react';
import {H2, H4} from "../components/heading/Headings.jsx";
import {useTranslator} from "../providers/i18n";
import {Slider} from "../components/slider/Slider";
import {useUserStore} from "../stores/useUserStore";

export const Hello = () => {
  const t = useTranslator();

  const {name, logo, color} = Meteor.settings.public.app;
  const welcomeSlogan = `Probably the best coffee in your town`
  const welcomeMessage = `${t('Welcome to {$name}', {name: name})}!`

  const {me} = useUserStore();
  const userGreeting = `${t('Greeting {$name}', {name: me.firstname})}!`

  const {homepage} = Meteor.settings.public.pages;

  return (
    <>
      <div className="mb-6">
        <div className={"flex items-center justify-center opacity-50"}>
          <h4 className="m-text font-bold mb-1">{t(welcomeSlogan)}</h4>
        </div>
        <div className={"flex items-center justify-center"}>
          <H2 text={welcomeMessage}/>
        </div>
      </div>

      <div className="space-y-6">
        <div className={"flex items-center justify-center"}>
          <H4 text={userGreeting} style={{color: color.text.accent}}/>
        </div>

        <div className="mb-3">
          <Slider carousel={homepage.carousel1} showCaption={false}/>
        </div>

        <div className="mb-3">
          <Slider carousel={homepage.carousel2} interval={5000} showCaption={false}/>
        </div>
      </div>
    </>
  );
};
