import {RATE_LIMITER} from '../enums/rateLimitter.js';
import {CONTACT_REQUESTS_METHOD} from "../enums/method";
import {CONTACT_REQUESTS_PUBLICATION} from "../enums/publication";

const LISTS_METHODS =  Object.values(CONTACT_REQUESTS_METHOD)
const LIST_PUBLICATIONS =   Object.values(CONTACT_REQUESTS_PUBLICATION);

DDPRateLimiter.addRule({
  name() {
    return [
      ...LISTS_METHODS,
      ...LIST_PUBLICATIONS
    ];
  },
  connectionId() {
    return true;
  }
}, RATE_LIMITER.REQUEST_COUNT, RATE_LIMITER.TIME_INTERVAL);
