import React from 'react';
import {Meteor} from 'meteor/meteor';
import {createRoot} from 'react-dom/client';
import {App} from './ui/App';
import {onChangeLocale} from "../imports/modules/shared/functions/onChangeLocale";
import {DeviceUtility} from "./shared/utilities/DeviceUtility";
import './main.css';
import { LOCAL_STORAGE } from './shared/enums/localStorage';

/**
 * @param language {string} [optional]
 */
const _setLocalization = async language => {

  /**
   * @param language {string} [optional]
   * @returns {string}
   * @private
   */
  function _getLang(language) {
    const savedLanguage = localStorage.getItem(LOCAL_STORAGE.LANGUAGE);

    language =
      language ||
      savedLanguage ||
      navigator.languages && navigator.languages[0] ||
      navigator.language ||
      navigator.browserLanguage ||
      navigator.userLanguage ||
      Meteor.settings.public.app["defaultLanguage"];

    localStorage.setItem(LOCAL_STORAGE.LANGUAGE, language);

    document.documentElement.setAttribute('translate', 'no');
    document.documentElement.setAttribute('lang', language);

    return language;
  }

  // Set global i18n language
  await onChangeLocale(_getLang(language));
}

Meteor.startup(async () => {
  const savedLanguage = localStorage.getItem(LOCAL_STORAGE.LANGUAGE);
  await _setLocalization(savedLanguage || Meteor.settings.public.app.defaultLanguage);

  if (DeviceUtility.isServiceWorkerAvailable()) {
    try {
      await navigator.serviceWorker.register('/sw.js');
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  }

  const brand = Meteor.settings.public.app["brand"];
  const linkElement = document.createElement('link');
  linkElement.rel = 'stylesheet';
  linkElement.href = `/online/${brand}/style.css?v=18`;
  document.head.appendChild(linkElement);

  const container = document.getElementById('react-target');
  const root = createRoot(container);
  root.render(<App tab="home" data-brand={brand} />);
});
