import {createMethod} from 'meteor/jam:method';
import {linkSchema} from "./schemas/linkSchema.js";
import {linkService} from "./linkService";

export const linkInsert = createMethod({
  name: 'link.insert',
  schema: linkSchema,
  async run({title, url}) {
    return linkService.add(title, url);
  }
});
