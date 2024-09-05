import {Accounts} from 'meteor/accounts-base';
import {event} from "../../shared/event/server/init";
import {EVENT} from "../../shared/enums/event";

Accounts.onLogin(async function (payload) {
  const {user} = payload;

  event.emit(EVENT.SET_USER_PARTITION, {userId: user._id});

  return user;
});
