import {event} from "../../shared/event/server/init.js";
import {EVENT} from "../../shared/enums/event.js";
import {profileService} from "../profileService";

event.on(EVENT.SET_PROFILE, async function ({userId}) {
  await profileService.create(userId)
});
