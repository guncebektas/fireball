import './init.js';
import './modules.js';
import {Meteor} from "meteor/meteor";
import {ServiceConfiguration} from "meteor/service-configuration";
import {Roles} from 'meteor/alanning:roles'
import {ROLE} from "../imports/modules/shared/enums/role";
import {ROLE_SCOPE} from "../imports/modules/shared/enums/roleScope";
import {dummyLinkService} from "../imports/modules/app/dummy/dummyService";

Meteor.startup(async () => {
  // Dummy data
  await dummyLinkService.add();

  // Set oAuth services
  const services = Meteor.settings.private.oAuth;

  if (services) {
    for (let service in services) {
      await ServiceConfiguration.configurations.upsertAsync({service: service}, {
        $set: services[service]
      });
    }
  }

  // Set user roles
  await Roles.createRoleAsync(ROLE.ADMIN, ROLE_SCOPE.USER);
  await Roles.createRoleAsync(ROLE.USER, ROLE_SCOPE.USER);
});
