import {Meteor} from 'meteor/meteor';
import {Log} from 'meteor/logging';

/**
 * Initialize server at startup
 * @locus server
 */
class ServerInit {
  /**
   * @constructor
   */
  constructor() {
    this._setMailURL();
    this._setAccountConfigurations();

    Log.warn({message: '################################', app: 'INIT'});
    Log.warn({message: 'Meteor SaaS Boilerplate started!', app: 'INIT'});
    Log.warn({message: '################################', app: 'INIT'});
  }

  /**
   * @private
   */
  _setMailURL() {
    Log.debug('_setMailURL initialized');

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    process.env.MAIL_URL = Meteor.settings.private.mail.url;
  }

  /**
   * @private
   */
  _setAccountConfigurations() {
    Accounts.emailTemplates.from = Meteor.settings.private.mail.fromName;
    Accounts.emailTemplates.sitename = Meteor.settings.private.mail.siteName;
  }
}

import { ServiceConfiguration } from "meteor/service-configuration";
const services = Meteor.settings.private.oAuth;

if (services) {
  for (let service in services) {
    await ServiceConfiguration.configurations.upsertAsync({service: service}, {
      $set: services[service]
    });
  }
}

/**
 * No need to export.
 * It will only run once on server initialize
 */
new ServerInit();
