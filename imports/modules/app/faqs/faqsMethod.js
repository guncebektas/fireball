import {createMethod} from 'meteor/jam:method';
import {faqsSchema} from "./schemas/faqsSchema.js";
import {faqsListSchema} from "./schemas/faqsListSchema";
import {faqService} from "./faqService";
import {oneRowSchema} from "../../shared/schemas/oneRowSchema";
import {FAQS_METHOD} from "./enums/method";

export const faqsMethod = {
  insert: createMethod({
    name: FAQS_METHOD.INSERT,
    schema: faqsSchema,
    async run(object) {
      return faqService.insert(object);
    }
  }),
  delete: createMethod({
    name: FAQS_METHOD.DELETE,
    schema: oneRowSchema,
    async run({_id}) {
      return faqService.delete(_id);
    }
  }),
  list: createMethod({
    name: FAQS_METHOD.LIST,
    schema: faqsListSchema,
    async run({organizationId}) {
      return faqService.list(organizationId);
    }
  })
}
