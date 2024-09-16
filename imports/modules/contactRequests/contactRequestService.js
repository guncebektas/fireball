import {BaseService} from "../shared/service/baseService.js";
import {contactRequestRepository} from "./contactRequestRepository.js";

class ContactRequestService extends BaseService {
  constructor({repository}) {
    super({repository});
  }
}

export const contactRequestService = new ContactRequestService({
  repository: contactRequestRepository
});
