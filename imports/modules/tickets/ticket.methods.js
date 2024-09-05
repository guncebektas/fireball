import {createMethod} from 'meteor/jam:method';
import {z} from 'zod';
import {ticketService} from "./ticketService.js";
import {ticketFormSchema} from "./schemas/ticketSchema.js";

export const ticketUpsert = createMethod({
  name: 'ticket.upsert',
  schema: z.object({
    ...{_id: z.string().optional()},
    ...ticketFormSchema
  }),
  async run(object) {
    return ticketService.upsert(object);
  }
});

export const ticketRemove = createMethod({
  name: 'ticket.remove',
  schema: z.object({
    ...{_id: z.string()}
  }),
  async run({_id}) {
    return ticketService.remove(_id);
  }
});
