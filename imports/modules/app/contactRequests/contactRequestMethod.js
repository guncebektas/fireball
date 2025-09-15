import {createMethod} from 'meteor/jam:method';
import {contactSchema} from "./schemas/contactSchema";
import {contactRequestService} from "./contactRequestService";
import {oneRowSchema} from "../../shared/schemas/oneRowSchema";
import {CONTACT_REQUESTS_METHOD} from "./enums/method";

export const contactRequestMethod = {
  insert: createMethod({
    name: CONTACT_REQUESTS_METHOD.INSERT,
    schema: contactSchema,
    open: true,
    async run({object}) {
      return contactRequestService.insert(object);
    }
  }),
  delete: createMethod({
    name: CONTACT_REQUESTS_METHOD.DELETE,
    schema: oneRowSchema,
    async run({_id}) {
      return contactRequestService.remove(_id);
    }
  })
}
