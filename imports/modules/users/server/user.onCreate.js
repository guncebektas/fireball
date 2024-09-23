import {Accounts} from 'meteor/accounts-base';
import {event} from "../../shared/event/server/init.js";
import {EVENT} from "../../shared/enums/event.js";

const _isFirstUser = async () => {
  return await Meteor.users.find().countAsync() === 1;
};

Accounts.onCreateUser(async function (options, user) {
  // this is our first user. Thus, we are adding all roles
  if (await _isFirstUser()) {
    event.emit(EVENT.SET_ADMIN_ROLE, {userId: user._id});
  } else {
    event.emit(EVENT.SET_USER_ROLE, {userId: user._id});
  }

  event.emit(EVENT.SET_USER_PROFILE, {userId: user._id});
  event.emit(EVENT.SET_ORGANIZATION, {userId: user._id});

  return user;
});
