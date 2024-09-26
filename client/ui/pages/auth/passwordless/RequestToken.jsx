import React, {useRef} from 'react';
import {Button, Label, TextInput} from 'flowbite-react';
import {useTranslator} from "../../../providers/i18n";
import {H2} from "../../../components/heading/Headings";

export const RequestToken = ({onStateChange}) => {
  const t = useTranslator();

  /*
  profileInsert({_id: "Q3FusXa4iWb9SH7PQ"}, (error, response) => {
    console.log(error);
    console.log(response);
  });
  */

  const emailRef = useRef();

  const handleAlreadyHaveToken = () => {
    onStateChange(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      email: emailRef.current.value,
    };

    Accounts.requestLoginTokenForUser(
      {
        selector: {
          email: formData.email
        },
        userData: {
          email: formData.email
        }
      });
  };

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <H2 text={t('Request token')}/>

      <div className="bg-white dark:bg-gray-900 py-8 px-4 mt-8 shadow sm:rounded-lg sm:px-10">
        <div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="mb-2">
              <div className="mb-2 block">
                <Label htmlFor="email" value={t('Email address')}/>
              </div>
              <TextInput id="email" type="email" ref={emailRef} required/>
            </div>
            <div>
              <Button type="submit" color="primary">{t('Request')}</Button>
            </div>
          </form>
          <div className="mt-3 flex justify-end">
            <Button className="text-blue" onClick={handleAlreadyHaveToken}>{t('I already have a token')}</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
