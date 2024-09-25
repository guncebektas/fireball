import {BaseRepository} from "../../shared/repository/baseRepository";
import {Images} from "./database/images.js";

class ImageRepository extends BaseRepository{
  constructor(collection) {
    super(collection);
  }
}

export const imageRepository = new ImageRepository(Images.collection)
