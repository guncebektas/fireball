import {BaseService} from "../shared/service/baseService.js";
import {linkRepository} from "./linkRepository";

class LinkService extends BaseService {
  constructor(linkRepository) {
    super();
    this.linkRepository = linkRepository;
  }

  async add(title, url) {
    await this.linkRepository.insertAsync({
      title, url
    })
  }
}

export const linkService = new LinkService(linkRepository);
