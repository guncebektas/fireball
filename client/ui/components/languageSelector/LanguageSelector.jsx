import React from "react";
import {Dropdown} from "flowbite-react";
import {useTranslator} from "../../providers/i18n";
import {onChangeLocale} from "../../../../imports/modules/shared/functions/onChangeLocale";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faLanguage } from '@fortawesome/free-solid-svg-icons';

export const LanguageSelector = (onlyIcon = false) => {
  const t = useTranslator();
  const {supportedLanguages} = Meteor.settings.public.app;

  const label = onlyIcon ? (
    <FontAwesomeIcon icon={faLanguage}/>
  ) : (
    t("Language")
  );

  return (
    <Dropdown label={label} inline className="mr-3">
      {supportedLanguages.map(({ languageCode, languageLabel }) => (
        <Dropdown.Item key={languageCode} onClick={() => onChangeLocale(languageCode)}>
          <img src={`/online/images/flags/${languageCode}.svg`} alt={languageLabel} className="w-5 mr-1"/>
          {languageLabel}
        </Dropdown.Item>
      ))}
    </Dropdown>
  );
};
