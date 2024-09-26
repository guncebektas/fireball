import React from 'react';
import {Button, Label, TextInput} from 'flowbite-react';
import {useTranslator} from "../../../providers/i18n";
import {H2} from "../../../components/heading/Headings";

export const EnterToken = ({onStateChange}) => {
  const t = useTranslator();

  const handleAlreadyHaveToken = () => {
    onStateChange(true);
  };

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <H2 text="Login"/>

      <div className="bg-white dark:bg-gray-900 py-8 px-4 mt-8 shadow sm:rounded-lg sm:px-10">
        <div>
          <form className="space-y-6">
            <div className="mb-2">
              <div className="mb-2 block">
                <Label htmlFor="token" value={t('Your token')}/>
              </div>
              <TextInput id="token" type="text" required/>
            </div>
            <div>
              <Button type="submit" color="primary">{t('Submit')}</Button>
            </div>
          </form>
          <div className="mt-3 flex justify-end">
            <Button className="text-blue" onClick={handleAlreadyHaveToken}>{t('I don\'t have a token yet')}</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
