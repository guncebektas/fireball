import {event} from "../../shared/event/server/init.js";
import {EVENT} from "../../shared/enums/event.js";

event.on(EVENT.SET_USER_PARTITION, function ({userId}) {
  // Partitioner.setUserGroup(userId, userId)
});
