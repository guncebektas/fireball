import {EJSON} from 'meteor/ejson';

class ApiContract {
  constructor(success, data) {
    this.status = success;
    this.data = data;
  }

  ok(data = null) {
    return new ApiContract(true, data);
  }

  fail(error = null) {
    return new ApiContract(false, error);
  }
}

// Create a singleton and also export as class definition
const api = new ApiContract();

export {api, ApiContract};
