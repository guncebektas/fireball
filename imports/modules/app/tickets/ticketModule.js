import {TICKET_PUBLICATION} from "./enums/publication";
import {ticketRepository} from "./ticketRepository";
import {ticketsMethods} from "./ticket.methods";
import {ROUTE} from "../../../../client/routes/enums/route";

export const ticketModule = {
  publisher: TICKET_PUBLICATION,
  repository: ticketRepository,
  methods: ticketsMethods,
  list: {
    title: 'Tickets',
    route: ROUTE.SETTINGS_TICKETS_LIST,
  },
  form: {
    title: 'Ticket',
    route: ROUTE.SETTINGS_TICKETS_FORM,
  }
}
