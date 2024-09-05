import {BaseService} from "../shared/service/baseService.js";
import {ticketRepository} from "./ticketRepository.js";

class TicketService extends BaseService {
  constructor(ticketRepository) {
    super();
    this.repository = ticketRepository;
  }
  /**
   * @param object {object}
   * @return {Promise<void>}
   */
  async upsert(object) {
    return this.repository.upsertAsync({
      _id: object?._id
    }, {
      $set: object
    });
  }

  /**
   * @param _id {string}
   * @return {Promise<number>}
   */
  async remove(_id) {
    return this.repository.removeAsync(_id);
  }
}

export const ticketService = new TicketService(ticketRepository);
