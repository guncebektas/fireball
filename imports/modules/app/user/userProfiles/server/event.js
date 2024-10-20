import {event} from "../../../../shared/event/server/init.js";
import {EVENT} from "../../../../shared/enums/event.js";
import {userProfileService} from "../userProfileService";

event.on(EVENT.SET_USER_PROFILE, async function ({user}) {
  await userProfileService.create(user)
});
