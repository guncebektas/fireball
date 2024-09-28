import { SyncedCron } from 'meteor/quave:synced-cron';
import { Meteor } from 'meteor/meteor';
import {Log} from "meteor/logging";

SyncedCron.config({
  log: true,
});

Meteor.startup(() => {
  SyncedCron.add({
    name: 'A cron job which runs in every 30 seconds',
    schedule: (parser) => parser.text('every 30 seconds'),
    job: () => {
      // eslint-disable-next-line no-console
      Log.info(`Cron job is running in every 30 seconds`);
    },
  });
  SyncedCron.start();
});
