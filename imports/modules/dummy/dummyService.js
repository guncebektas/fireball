import {BaseService} from "../shared/service/baseService.js";
import {DUMMY_LINKS} from "./enums/links";
import {linkRepository} from "../link/linkRepository";
import {linkService} from "../link/linkService";

export class DummyService extends BaseService {
  constructor(repository, service, data) {
    super();

    this.repository = linkRepository;
    this.service = linkService;
    this.data = DUMMY_LINKS;
  }

  async insert() {
    if (await this.repository.find().countAsync() === 0) {
      for (const link of this.data) {
        await this.service.add(link.title, link.url);
      }
    }
  }
}
