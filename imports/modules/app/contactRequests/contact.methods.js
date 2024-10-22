import {createMethod} from 'meteor/jam:method';
import {z} from 'zod';
import {contactFormSchema} from "./schemas/contactSchema";
import {contactRequestService} from "./contactRequestService";

export const contactRequestUpsert = createMethod({
  name: 'contactRequest.upsert',
  schema: z.object({
    ...{_id: z.string().optional()},
    ...contactFormSchema
  }),
  async run(object) {
    return contactRequestService.upsert(object);
  }
});

export const contactRequestDelete = createMethod({
  name: 'contactRequest.delete',
  schema: z.object({
    ...{_id: z.string()}
  }),
  async run({_id}) {
    return contactRequestService.remove(_id);
  }
});
