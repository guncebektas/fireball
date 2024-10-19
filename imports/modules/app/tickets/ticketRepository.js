import {Tickets} from "./database/tickets.js";
import {BaseRepository} from "../../shared/repository/baseRepository";

class TicketRepository extends BaseRepository {
  constructor() {
    super(Tickets);
  }
}

export const ticketRepository = new TicketRepository();
