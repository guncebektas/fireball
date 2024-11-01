import { SyncedCron } from 'meteor/quave:synced-cron';
import { Meteor } from 'meteor/meteor';
import {Log} from "meteor/logging";

SyncedCron.config({
  log: true,
});

Meteor.startup(() => {
  SyncedCron.add({
    name: 'A cron job which runs in every 5 minutes',
    schedule: (parser) => parser.text('every 5 minutes'),
    job: () => {
      // eslint-disable-next-line no-console
      Log.info(`Cron job is running in every 5 minutes`);
    },
  });
  SyncedCron.start();
});
