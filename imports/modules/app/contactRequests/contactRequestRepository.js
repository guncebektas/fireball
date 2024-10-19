import {BaseRepository} from "../../shared/repository/baseRepository.js";
import {ContactRequests} from "./database/contactRequests";

class ContactRepository extends BaseRepository {
  constructor(collection) {
    super(collection);
  }
}

export const contactRequestRepository = new ContactRepository(ContactRequests);
