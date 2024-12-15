import {createMethod} from 'meteor/jam:method';
import {docSchema} from "./schemas/docSchema.js";
import {docService} from "./docService";
import {DOCS_METHOD} from "./enums/method";

export const docsMethod = {
  insert: createMethod({
    name: DOCS_METHOD.CREATE,
    schema: docSchema,
    async run({title, url}) {
      return docService.add(title, url);
    }
  })
}
