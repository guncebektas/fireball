import React from 'react';
import {H2, H4} from "../components/heading/Headings.jsx";
import {useTranslator} from "../providers/i18n";
import {Slider} from "../components/slider/Slider";
import {useUserStore} from "../stores/useUserStore";

export const Hello = () => {
  const t = useTranslator();

  const {name, logo, color} = Meteor.settings.public.app;
  const welcomeMessage = `${t('Welcome to {$name}', {name: name})}!`
  const welcomeSlogan = `Probably the best coffee in your town`

  const {me} = useUserStore();
  const userGreeting = `${t('Greeting {$name}', {name: me.firstname})}!`

  const {carousel} = Meteor.settings.public.pages.aboutUs;

  return (
    <>
      <div className="mb-6">
        <div className={"flex items-center justify-center"}>
          <H2 text={welcomeMessage}/>
        </div>
        <div className={"flex items-center justify-center opacity-50"}>
          <H4 text={welcomeSlogan}/>
        </div>
      </div>

      <div className="space-y-6">
        <div className={"flex items-center justify-center"}>
          <H4 text={userGreeting} style={{color: color.text.accent}}/>
        </div>

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
