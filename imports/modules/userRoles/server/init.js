import {ROLE} from "../../shared/enums/role.js";
import {Roles} from 'meteor/alanning:roles';

const roles = Object.values(ROLE);
for (const role of roles) {
  await Roles.createRoleAsync(role, {unlessExists: true});
}
