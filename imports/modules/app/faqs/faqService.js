import {BaseService} from "../../shared/service/baseService";
import {faqRepository} from "./faqRepository";

class FaqService extends BaseService {
  constructor({repository}) {
    super({repository});
  }
}

export const faqService = new FaqService({
  repository: faqRepository
});
