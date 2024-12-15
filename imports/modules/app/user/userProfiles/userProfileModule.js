import {USER_PROFILE_PUBLICATION} from "./enums/publication";
import {userProfileRepository} from "./userProfileRepository";
import {userProfilesMethods} from "./userProfileMethod";
import {ROUTE} from "../../../../../client/routes/enums/route";

export const userProfileModule = {
  publisher: USER_PROFILE_PUBLICATION,
  repository: userProfileRepository,
  methods: userProfilesMethods,
  listRoute: ROUTE.USER_PROFILES
}
