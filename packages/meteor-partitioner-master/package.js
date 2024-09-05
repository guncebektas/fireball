Package.describe({
  name: "wildhart:partitioner",
  summary: "Transparently divide a meteor app into different instances shared between groups of users.",
  version: "3.0.3",
  git: "https://github.com/wildhart/meteor-partitioner"
});

Package.onUse(function (api) {
  api.versionsFrom('2.8.1', '3.0-alpha.19');
  // Client & Server deps
  api.use([
    'accounts-base@3.0.0-rc300.4',
    'check',
    'ecmascript',
    'ddp', // Meteor.publish available
    'mongo@2.0.0-rc300.4' // Mongo.Collection available
  ]);

  api.addFiles('hooks.js');
  api.addFiles('common.js');
  api.addFiles('grouping.js', 'server');
  api.addFiles('grouping_client.js', 'client');

  api.export(['Partitioner', 'Grouping']);
});
