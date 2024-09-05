import React from 'react';
import {Meteor} from 'meteor/meteor';
import i18n from 'meteor/universe:i18n';
import {createRoot} from 'react-dom/client';
import {App} from '/client/ui/App';

const onChangeLocale = locale => {
  /* eslint-disable no-unreachable */
  if (false) {
    import '../translations/en-US.i18n.json';
    import '../translations/tr-TR.i18n.json';
  }

  import(`../translations/${locale}`).then(() => {
    i18n.setLocale(locale);
  });
};

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
    language = language ||
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
