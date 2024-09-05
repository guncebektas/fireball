import {event} from "../../shared/event/server/init.js";
import {EVENT} from "../../shared/enums/event.js";
import {ROLE} from "../../shared/enums/role.js";
import {Roles} from "meteor/alanning:roles";
import {organizationService} from "../organizationService";

event.on(EVENT.SET_ORGANIZATION, async function ({userId}) {
  await organizationService.create(userId)
});
