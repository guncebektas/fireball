import {BaseService} from "../shared/service/baseService.js";
import {linkRepository} from "./linkRepository";

class LinkService extends BaseService {
  constructor({repository}) {
    super({repository});
  }

  async add(title, url) {
    await this.repository.insertAsync({
      title, url
    })
  }
}

export const linkService = new LinkService({
  repository: linkRepository
});
