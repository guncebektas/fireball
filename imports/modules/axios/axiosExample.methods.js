
import { createMethod } from 'meteor/jam:method';
import ApiService from "./apiService";

export const axiosExample = createMethod({
  name: 'axios.example',
  schema: null,
  async run() {
    try {
      const endpoint = 'https://app.ritapos.com/api/v1/orders/Yd9MRrk6qPo2r67Qi';
      const response = await ApiService.get(endpoint); // Use ApiService to fetch data
      console.log('Data fetched successfully:', response);
      return response;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw new Meteor.Error('fetch-failed', 'Failed to fetch data');
    }
  },
});
