import {createMethod} from 'meteor/jam:method'; // can import { Methods } from 'meteor/jam:method' instead and use Methods.create if you prefer
import {z} from "zod";
import apiServiceInstance from "../../infrastructure/axios/apiServiceInstance";

export const storesMethods = {
  getStores: createMethod({
    name: 'storesMethods.getStores',
    schema: z.object({url: z.string()}),
    serverOnly: true,
    async run({url}) {
      try {
        return apiServiceInstance.get(url);
      } catch (error) {
        throw new Meteor.Error('rss-fetch-failed', 'Failed to fetch RSS feed');
      }
    }
  })
};
