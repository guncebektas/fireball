import {createMethod} from 'meteor/jam:method'; // can import { Methods } from 'meteor/jam:method' instead and use Methods.create if you prefer
import {z} from "zod";
import {organizationService} from "./organizationService";

export const organizationMethod = {
  addKey: createMethod({
    name: 'organization.addKey',
    schema: z.object({organizationId: z.string()}),
    async run({organizationId}) {
      return organizationService.addKey(organizationId);
    }
  }),

  removeKey: createMethod({
    name: 'organization.removeKey',
    schema: z.object({key: z.string()}),
    async run({key}) {
      return organizationService.removeKey(key);
    }
  })
}
