import {createMethod} from 'meteor/jam:method';
import {ticketService} from "./ticketService.js";
import {ticketSchema} from "./schemas/ticketSchema.js";
import {oneRowSchema} from "../../shared/schemas/oneRowSchema";

export const ticketsMethods = {
  upsert: createMethod({
    name: 'tickets.upsert',
    schema: ticketSchema,
    async run(object) {
      return ticketService.upsert(object);
    }
  }),

  delete: createMethod({
    name: 'tickets.delete',
    schema: oneRowSchema,
    async run({_id}) {
      return ticketService.remove(_id);
    }
  }),
}
