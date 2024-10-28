import {createMethod} from 'meteor/jam:method'; // can import { Methods } from 'meteor/jam:method' instead and use Methods.create if you prefer
import {userRoleService} from "./userRoleService.js";
import {oneRowSchema} from "../../../shared/schemas/oneRowSchema";
import {isAdminMixin} from "../../../shared/mixins/isAdminMixin";

export const userRolesMethods = {
  setAsManager: createMethod({
    name: 'userRoles.setAsManager',
    schema: oneRowSchema,
    serverOnly: true,
    before: isAdminMixin,
    async run({ _id }) {
      return userRoleService.setAsManager(_id);
    }
  })
}
