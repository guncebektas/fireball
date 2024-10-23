import {BaseService} from "../../shared/service/baseService";
import {docRepository} from "../docs/docRepository";
import {docService} from "../docs/docService";
import {DUMMY_DOCS} from "./enums/docs";

class DummyService extends BaseService {
  constructor({repository, service, data}) {
    super({repository});

    this.service = service;
    this.data = data;
  }

  async add() {
    //
    // XXX: Do not fill dummy data in production
    //
    if (Meteor.isProduction) {
      return;
    }

    if (await this.repository.find().countAsync() === 0) {
      for (const doc of this.data) {
        await this.service.add(doc.title, doc.url);
      }
    }
  }
}

export const dummyLinkService = new DummyService({
  repository: docRepository,
  service: docService,
  data: DUMMY_DOCS
})
