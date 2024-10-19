import {BaseRepository} from "../../shared/repository/baseRepository.js";
import {Links} from "./database/links";

class LinkRepository extends BaseRepository {
  constructor() {
    super(Links);
  }
}

export const linkRepository = new LinkRepository();
