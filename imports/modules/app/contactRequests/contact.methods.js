import {createMethod} from 'meteor/jam:method';
import {contactSchema} from "./schemas/contactSchema";
import {contactRequestService} from "./contactRequestService";
import {oneRowSchema} from "../../shared/schemas/oneRowSchema";

export const contactRequestMethods = {
  upsert: createMethod({
    name: 'contactRequest.upsert',
    schema: contactSchema,
    async run(object) {
      return contactRequestService.upsert(object);
    }
  }),
  delete: createMethod({
    name: 'contactRequest.delete',
    schema: oneRowSchema,
    async run({_id}) {
      return contactRequestService.remove(_id);
    }
  })
}
