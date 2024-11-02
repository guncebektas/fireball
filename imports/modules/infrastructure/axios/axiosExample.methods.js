import {createMethod} from 'meteor/jam:method';
import {apiServiceInstance} from "./apiServiceInstance";
import {ERROR_CODE} from "../../shared/enums/errorCodes";

export const axiosExample = createMethod({
  name: 'axios.example',
  schema: null,
  async run() {
    try {
      const endpoint = 'https://app.ritapos.com/api/v1/orders/Yd9MRrk6qPo2r67Qi';
      const response = await apiServiceInstance.get(endpoint); // Use ApiService to fetch data
      console.log('Data fetched successfully:', response);
      return response;
    } catch (error) {
      throw new Meteor.Error(ERROR_CODE["500"].LABEL, ERROR_CODE["500"].DESCRIPTION);
    }
  },
});
