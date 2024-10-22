import {Faqs} from "../database/faqs";
import {Log} from "meteor/logging";

await Faqs.createIndex({
  'organizationId': 1
}).catch(error => {
  Log.error(`Faqs.createIndexAsync`);
  Log.error(error);
});
