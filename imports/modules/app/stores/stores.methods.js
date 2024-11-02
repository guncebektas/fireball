import {createMethod} from 'meteor/jam:method'; // can import { Methods } from 'meteor/jam:method' instead and use Methods.create if you prefer
import {ERROR_CODE} from "../../shared/enums/errorCodes";
import {storeService} from "./storeService";
import {oneRowSchema} from "../../shared/schemas/oneRowSchema";

export const storesMethods = {
  getProductCategories: createMethod({
    name: 'storesMethods.getProductCategories',
    schema: oneRowSchema,
    serverOnly: true,
    async run({_id}) {
      try {
        return storeService.getProductCategories(_id);
      } catch (error) {
        throw new Meteor.Error(ERROR_CODE["500"].LABEL, ERROR_CODE["500"].DESCRIPTION);
      }
    }
  }),

  getProducts: createMethod({
    name: 'storesMethods.getProducts',
    schema: oneRowSchema,
    serverOnly: true,
    async run({_id}) {
      try {
        return storeService.getProducts(_id);
      } catch (error) {
        throw new Meteor.Error(ERROR_CODE["500"].LABEL, ERROR_CODE["500"].DESCRIPTION);
      }
    }
  })
};
