import {BaseService} from "../../shared/service/baseService";
import {imageRepository} from "./imageRepository";

class ImageService extends BaseService{
  constructor(repository) {
    super(repository);
  }

  async get(_id) {
    return this.repository.findOne(_id);
  }
}

export const imageService = new ImageService(imageRepository)
