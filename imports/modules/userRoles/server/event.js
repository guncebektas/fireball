import {event} from "../../shared/event/server/init.js";
import {EVENT} from "../../shared/enums/event.js";
import {ROLE} from "../../shared/enums/role.js";
import {Roles} from "meteor/alanning:roles";

event.on(EVENT.SET_ADMIN_ROLE, async function ({userId}) {
  await Roles.addUsersToRolesAsync(userId, Object.values(ROLE));
});
