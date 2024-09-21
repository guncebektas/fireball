import {BaseService} from "../shared/service/baseService.js";
import {linkRepository} from "../links/linkRepository";
import {linkService} from "../links/linkService";
import {DUMMY_LINKS} from "./enums/links";

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
      for (const link of this.data) {
        await this.service.add(link.title, link.url);
      }
    }
  }
}

export const dummyLinkService = new DummyService({
  repository: linkRepository,
  service: linkService,
  data: DUMMY_LINKS
})
