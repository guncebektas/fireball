import {BaseRepository} from "../shared/repository/baseRepository.js";
import {Tickets} from "./database/tickets.js";

class TicketRepository extends BaseRepository {
  constructor() {
    super(Tickets);
  }
}

export const ticketRepository = new TicketRepository();
