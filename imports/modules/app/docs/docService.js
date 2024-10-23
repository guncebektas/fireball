import {BaseService} from "../../shared/service/baseService";
import {docRepository} from "./docRepository";

class DocService extends BaseService {
  constructor({repository}) {
    super({repository});
  }

  async add(title, url) {
    await this.repository.insertAsync({
      title, url
    })
  }
}

export const docService = new DocService({
  repository: docRepository
});
