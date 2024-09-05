import {ContactRequests} from "../database/contactRequests";

ContactRequests.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});
