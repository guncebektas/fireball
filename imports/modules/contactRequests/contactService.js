import {BaseService} from "../shared/service/baseService.js";
import {contactRepository} from "./contactRepository.js";

class ContactService extends BaseService {
  constructor(repository) {
    super(repository);
  }
}

export const contactService = new ContactService(contactRepository);
