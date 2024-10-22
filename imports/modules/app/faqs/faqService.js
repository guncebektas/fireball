import {BaseService} from "../../shared/service/baseService";
import {faqRepository} from "./faqRepository";

class FaqService extends BaseService {
  constructor({repository}) {
    super({repository});
  }

  async upsert(_id, question, answer) {
    await this.repository.upsertAsync({
      _id
    }, {
      $set: {
        organizationId: Meteor.settings.public.app._id,
        question,
        answer
      }
    })
  }

  async delete(_id) {
    await this.repository.removeAsync({
      organizationId: Meteor.settings.public.app._id,
      _id
    })
  }
}

export const faqService = new FaqService({
  repository: faqRepository
});
