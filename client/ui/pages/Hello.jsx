import React, {useState} from 'react';
import {Button} from "flowbite-react";
import {H2} from "../components/heading/Headings.jsx";
import {useTranslator} from "../providers/i18n";
import {Slider} from "../components/slider/Slider";

export const Hello = () => {
  const t = useTranslator();

  const {name, logo} = Meteor.settings.public.app;
  const { carousel } = Meteor.settings.public.pages.aboutUs;

  const welcomeMessage = `${t('Welcome to {$name}', {name: name})}!`

  const [counter, setCounter] = useState(0);

  const increment = () => {
    setCounter(counter + 1);
  };

  return (
    <>
      <div className="px-4 py-5 sm:p-6 sm:pt-8">
        <div className="sm:flex sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center">
              <H2 text={welcomeMessage}/>
            </div>
            <div className="mt-2 max-w-xl text-gray-500 text-lg">
              <p>{t('You\'ve pressed the button {$counter} times', {counter: counter})}.</p>
            </div>
          </div>
          <div className="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:flex sm:items-center">
            <Button
              gradientMonochrome="purple"
              onClick={increment}
            >
              {t('Click')}
            </Button>
          </div>
        </div>
      </div>

      <div className="mb-3">
        <Slider carousel={carousel} showCaption={false}/>
      </div>
    </>
  );
};
