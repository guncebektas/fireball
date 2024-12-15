import {Faqs} from "../database/faqs";

Faqs.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});
