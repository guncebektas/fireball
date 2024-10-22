import {createMethod} from 'meteor/jam:method';
import {faqsSchema} from "./schemas/faqsSchema.js";
import {faqsListSchema} from "./schemas/faqsListSchema";
import {faqService} from "./faqService";
import {oneRowSchema} from "../../shared/schemas/oneRowSchema";

export const faqsMethod = {
  upsert: createMethod({
    name: 'faqs.upsert',
    schema: faqsSchema,
    async run({_id, question, answer}) {
      return faqService.upsert(_id, question, answer);
    }
  }),

  delete: createMethod({
    name: 'faqs.delete',
    schema: oneRowSchema,
    async run({_id}) {
      return faqService.delete(_id);
    }
  }),

  list: createMethod({
    name: 'faqs.list',
    schema: faqsListSchema,
    async run({organizationId}) {
      return faqService.list(organizationId);
    }
  })
}
