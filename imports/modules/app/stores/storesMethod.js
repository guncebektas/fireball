import {createMethod} from 'meteor/jam:method'; // can import { Methods } from 'meteor/jam:method' instead and use Methods.create if you prefer
import {ERROR_CODE} from "../../shared/enums/errorCodes";
import {storeService} from "./storeService";
import {oneRowSchema} from "../../shared/schemas/oneRowSchema";
import {STORE_METHOD} from "./enums/method.stores";

export const storesMethod = {
  getProductCategories: createMethod({
    name: STORE_METHOD.GET_PRODUCT_CATEGORIES,
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
    name: STORE_METHOD.GET_PRODUCTS,
    schema: oneRowSchema,
    serverOnly: true,
    async run({_id}) {
      try {
        return storeService.getProducts(_id);
      } catch (error) {
        throw new Meteor.Error(ERROR_CODE["500"].LABEL, ERROR_CODE["500"].DESCRIPTION);
      }
    }
  }),

  getProductsFilteredByImages: createMethod({
    name: STORE_METHOD.GET_PRODUCTS_FILTERED_BY_IMAGES,
    schema: oneRowSchema,
    serverOnly: true,
    async run({_id}) {
      try {
        return storeService.getProductsFilteredByImages(_id);
      } catch (error) {
        throw new Meteor.Error(ERROR_CODE["500"].LABEL, ERROR_CODE["500"].DESCRIPTION);
      }
    }
  })
};
