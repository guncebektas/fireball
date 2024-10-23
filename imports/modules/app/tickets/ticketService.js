import {BaseService} from "../../shared/service/baseService.js";
import {ticketRepository} from "./ticketRepository.js";

class TicketService extends BaseService {
  constructor({repository}) {
    super({repository});
  }
}

export const ticketService = new TicketService({
  repository: ticketRepository
});
