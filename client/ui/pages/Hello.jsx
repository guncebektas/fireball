import React, {useState} from 'react';
import {Button} from "flowbite-react";
import {H2} from "../components/heading/Headings.jsx";

export const Hello = () => {
  const {name, logo} = Meteor.settings.public.app;
  const welcomeMessage = `Welcome to ${name}!`

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
              <H2 text={welcomeMessage}></H2>
              <img src={logo} alt={name}/>
            </div>
            <div className="mt-2 max-w-xl text-gray-500 text-lg">
              <p>
                You've pressed the button <b>{counter}</b> times.
              </p>
            </div>
          </div>
          <div className="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:flex sm:items-center">
            <Button
              color="blue"
              onClick={increment}
            >
              Click Me
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
