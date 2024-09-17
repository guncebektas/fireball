import {Accounts} from 'meteor/accounts-base';
import {event} from "../../shared/event/server/init";
import {EVENT} from "../../shared/enums/event";
import {Roles} from "meteor/alanning:roles";
import {Log} from "meteor/logging";

Accounts.onLogin(async function (payload) {
  const {user} = payload;

  event.emit(EVENT.SET_USER_PARTITION, {userId: user._id});

  const roles = await Roles.getRolesForUserAsync(user._id);

  Log.debug(`User ${user._id} has ${JSON.stringify(roles)} roles`);

  return user;
});
