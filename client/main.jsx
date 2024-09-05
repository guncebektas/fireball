import React from 'react';
import {Meteor} from 'meteor/meteor';
import {createRoot} from 'react-dom/client';
import {App} from '/client/ui/App';
import {onChangeLocale} from "./shared/functions/onChangeLocale";

/**
 * @param language {string} [optional]
 */
const _setLocalization = language => {

  /**
   * @param language {string} [optional]
   * @returns {string}
   * @private
   */
  function _getLang(language) {
    language =
      language ||
      navigator.languages && navigator.languages[0] ||
      navigator.language ||
      navigator.browserLanguage ||
      navigator.userLanguage ||
      Meteor.settings.public.app["defaultLanguage"];

    document.documentElement.setAttribute('translate', 'no');
    document.documentElement.setAttribute('lang', language);

    return language;
  }

  // Set global i18n language
  onChangeLocale(_getLang(language));
}

Meteor.startup(async () => {
  _setLocalization('en-US');

  const container = document.getElementById('react-target');
  const root = createRoot(container);
  root.render(<App tab="home" />);
});
