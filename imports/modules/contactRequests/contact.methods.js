import {createMethod} from 'meteor/jam:method';
import {z} from 'zod';
import {contactFormSchema} from "./schemas/contactSchema";
import {contactService} from "./contactService";

export const contactUpsert = createMethod({
  name: 'contact.upsert',
  schema: z.object({
    ...{_id: z.string().optional()},
    ...contactFormSchema
  }),
  async run(object) {
    return contactService.upsert(object);
  }
});

export const contactRemove = createMethod({
  name: 'contact.remove',
  schema: z.object({
    ...{_id: z.string()}
  }),
  async run({_id}) {
    return contactService.remove(_id);
  }
});
