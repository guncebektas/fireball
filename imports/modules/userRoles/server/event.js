import {event} from "../../shared/event/server/init.js";
import {EVENT} from "../../shared/enums/event.js";
import {ROLE} from "../../shared/enums/role.js";
import {Roles} from "meteor/alanning:roles";
import {ROLE_SCOPE} from "../../shared/enums/roleScope";

event.on(EVENT.SET_ADMIN_ROLE, async function ({userId}) {
  await Roles.addUsersToRolesAsync(userId, Object.values(ROLE), ROLE_SCOPE.USER);
});

event.on(EVENT.SET_USER_ROLE, async function ({userId}) {
  await Roles.addUsersToRolesAsync(userId, ROLE.USER, ROLE_SCOPE.USER);
});


