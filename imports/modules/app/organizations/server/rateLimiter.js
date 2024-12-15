import {RATE_LIMITER} from '../enums/rateLimitter.js';
import {ORGANIZATIONS_METHOD} from "../enums/method";
import {ORGANIZATION_PUBLICATION} from "../enums/publication";

const LISTS_METHODS =  Object.values(ORGANIZATIONS_METHOD)
const LIST_PUBLICATIONS =   Object.values(ORGANIZATION_PUBLICATION);

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
