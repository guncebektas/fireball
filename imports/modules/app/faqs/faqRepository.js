import {BaseRepository} from "../../shared/repository/baseRepository.js";
import {Faqs} from "./database/faqs";

class FaqRepository extends BaseRepository {
  constructor() {
    super(Faqs);
  }
}

export const faqRepository = new FaqRepository();
