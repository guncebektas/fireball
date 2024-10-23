import {TICKET_PUBLICATION} from "./enums/publication";
import {ticketRepository} from "./ticketRepository";
import {ticketsMethods} from "./ticket.methods";
import {ROUTE} from "../../../../client/routes/enums/route";

export const ticketModule = {
  publisher: TICKET_PUBLICATION,
  repository: ticketRepository,
  methods: ticketsMethods,
  listRoute: ROUTE.SETTINGS_TICKETS_LIST,
  formRoute: ROUTE.SETTINGS_TICKETS_FORM,
}
