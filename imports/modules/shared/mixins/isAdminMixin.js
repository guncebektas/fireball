import {Roles} from "meteor/alanning:roles";
import {ROLE} from "../enums/role";
import {ROLE_SCOPE} from "../enums/roleScope";
import {ERROR_CODE} from "../enums/errorCodes";

export const isAdminMixin = async ( ) => { // the original input passed into the method is available here. destructuring for _id since that's all we need for this function
  const isAdmin = await Roles.userIsInRoleAsync(this.userId, ROLE.ADMIN, ROLE_SCOPE.USER);

  if (isAdmin) {
    return true;
  }

  throw new Meteor.Error(ERROR_CODE["403"].LABEL, ERROR_CODE["403"].DESCRIPTION);
};
