import React from "react";
import {Dropdown} from "flowbite-react";
import {useTranslator} from "../../providers/i18n";
import {onChangeLocale} from "../../../shared/functions/onChangeLocale";

export const LanguageSelector = () => {
  const t = useTranslator();
  const {supportedLanguages} = Meteor.settings.public.app;

  return (
    <Dropdown label={t('Language')} inline className="mr-3">
      {supportedLanguages.map(({ languageCode, languageLabel }) => (
        <Dropdown.Item key={languageCode} onClick={() => onChangeLocale(languageCode)}>
          <img src={`online/images/flags/${languageCode}.svg`} alt={languageLabel} className="w-5 mr-1"/>
          {languageLabel}
        </Dropdown.Item>
      ))}
    </Dropdown>
  );
};
