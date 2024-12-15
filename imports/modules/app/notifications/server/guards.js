import {Notifications} from "../database/notifications";

Notifications.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});
