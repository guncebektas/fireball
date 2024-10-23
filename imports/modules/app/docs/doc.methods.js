import {createMethod} from 'meteor/jam:method';
import {docSchema} from "./schemas/docSchema.js";
import {docService} from "./docService";

export const docsMethods = {
  insert: createMethod({
    name: 'link.insert',
    schema: docSchema,
    async run({title, url}) {
      return docService.add(title, url);
    }
  })
}
