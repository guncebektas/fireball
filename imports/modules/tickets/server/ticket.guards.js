import {Tickets} from "../database/tickets.js";

Tickets.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});
