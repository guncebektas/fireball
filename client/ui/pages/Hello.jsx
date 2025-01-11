import React from 'react';
import {H2, H4} from "../components/heading/Headings.jsx";
import {useTranslator} from "../providers/i18n";
import {Slider} from "../components/slider/Slider";
import {useUserStore} from "../stores/useUserStore";
import {Wallet} from "./wallet/Wallet";

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
      <div className="grid gap-3">
        <div className={"flex items-center justify-center opacity-50"}>
          <h4 className="m-text font-bold mb-1">{t(welcomeSlogan)}</h4>
        </div>
        <div className={"flex items-center justify-center"}>
          <H2 text={welcomeMessage}/>
        </div>
      </div>

      <div className="grid gap-3">
        <div className={"flex items-center justify-center"}>
          <H4 text={userGreeting} style={{color: color.text.accent}}/>
        </div>
      </div>

      <div className="grid gap-3 mb-6">
        <Wallet showBanner={false}/>
      </div>

      <section className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 sm:p-6 ">
        <div className="grid gap-3">
          <Slider carousel={homepage.carousel1} showCaption={false}/>

          <Slider carousel={homepage.carousel2} interval={5000} showCaption={false}/>
        </div>
      </section>
    </>
  );
};
