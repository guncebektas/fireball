import {BaseRepository} from "../../shared/repository/baseRepository.js";
import {Organizations} from "./database/organizations";

class OrganizationRepository extends BaseRepository {
  constructor() {
    super(Organizations);
  }
}

export const organizationRepository = new OrganizationRepository();
