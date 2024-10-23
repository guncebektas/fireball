import {BaseRepository} from "../../shared/repository/baseRepository.js";
import {Docs} from "./database/docs";

class DocRepository extends BaseRepository {
  constructor() {
    super(Docs);
  }
}

export const docRepository = new DocRepository();
