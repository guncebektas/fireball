import { Migrations } from 'meteor/quave:migrations';
import { Meteor } from 'meteor/meteor';
import {Log} from "meteor/logging";

Migrations.config({
  log: true,
});

Migrations.add({
  version: 1,
  name: 'Not really migrating anything',
  up() {
    // eslint-disable-next-line no-console
    Log.info("A fake migration run");
  },
});

Meteor.startup(() => {
  Migrations.migrateTo('latest');
});
