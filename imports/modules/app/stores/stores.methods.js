import {createMethod} from 'meteor/jam:method'; // can import { Methods } from 'meteor/jam:method' instead and use Methods.create if you prefer
import {ERROR_CODE} from "../../shared/enums/errorCodes";
import {franchiseService} from "./franchiseService";

export const storesMethods = {
  getFranchiseMembers: createMethod({
    name: 'storesMethods.getFranchiseMembers',
    serverOnly: true,
    async run() {
      try {
        const {_id} = Meteor.settings.public.app;
        return franchiseService.getMembers(_id);
      } catch (error) {
        throw new Meteor.Error(ERROR_CODE["500"].LABEL, ERROR_CODE["500"].DESCRIPTION);
      }
    }
  })
};
