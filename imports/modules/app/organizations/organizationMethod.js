import {createMethod} from 'meteor/jam:method';
import {z} from "zod";
import {organizationService} from "./organizationService";
import {ORGANIZATIONS_METHOD} from "./enums/method";

export const organizationMethod = {
  addKey: createMethod({
    name: ORGANIZATIONS_METHOD.ADD_KEY,
    schema: z.object({organizationId: z.string()}),
    async run({organizationId}) {
      return organizationService.addKey(organizationId);
    }
  }),

  removeKey: createMethod({
    name: ORGANIZATIONS_METHOD.REMOVE_KEY,
    schema: z.object({key: z.string()}),
    async run({key}) {
      return organizationService.removeKey(key);
    }
  })
}
