import {createMethod} from 'meteor/jam:method';
import {ticketService} from "./ticketService.js";
import {ticketSchema} from "./schemas/ticketSchema.js";
import {oneRowSchema} from "../../shared/schemas/oneRowSchema";
import {TICKET_METHOD} from "./enums/method";

export const ticketsMethod = {
  insert: createMethod({
    name: TICKET_METHOD.INSERT,
    schema: ticketSchema,
    async run(object) {
      return ticketService.insert(object);
    }
  }),
  delete: createMethod({
    name: TICKET_METHOD.DELETE,
    schema: oneRowSchema,
    async run({_id}) {
      return ticketService.remove(_id);
    }
  }),
}
