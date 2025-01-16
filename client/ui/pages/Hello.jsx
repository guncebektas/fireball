import React from 'react';
import {H2, H4, H5} from "../components/heading/Headings.jsx";
import {useTranslator} from "../providers/i18n";
import {Slider} from "../components/slider/Slider";
import {useUserStore} from "../stores/useUserStore";
import {Wallet} from "./wallet/Wallet";
import {StoryBoard} from "../components/storyBoard/StoryBoard";

export const Hello = () => {
  const t = useTranslator();

  const {name, logo, color} = Meteor.settings.public.app;
  const welcomeSlogan = `Probably the best coffee in your town`
  const welcomeMessage = `${t('Welcome to {$name}', {name: name})}!`

  const {me} = useUserStore();
  const userGreeting = `${t('Greeting {$name}', {name: me.firstname})}!`

  const {homepage} = Meteor.settings.public.pages;

  return (
    <div className="bg-background-image">
      <div class="p-3">
        <div className="grid">
          <div className={"flex items-center justify-center opacity-50"}>
            <h4 className="m-text font-bold mb-1">{t(welcomeSlogan)}</h4>
          </div>
          <div className={"flex items-center justify-center"}>
            <H2 text={welcomeMessage} className="font-extrabold"/>
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
      </div>

      <section className="bg-secondary-50 dark:bg-gray-800 rounded-t-lg py-4 pl-4 pr-0">
        <div className="grid gap-6 my-6">
          <StoryBoard />
        </div>
      </section>

      <section className="bg-secondary-50 dark:bg-gray-800 pt-4 px-4 pb-0">
        <div className="grid gap-3">
          <H5 text={'Champaigns'}/>

          <Slider carousel={homepage.carousel1} showCaption={false}/>

          <Slider carousel={homepage.carousel2} interval={5000} showCaption={false}/>
        </div>
      </section>
    </div>
  );
};

