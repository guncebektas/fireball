import {RATE_LIMITER} from '../enums/rateLimitter.js';
import {USER_PROFILES_METHOD} from "../enums/method";
import {USER_PROFILE_PUBLICATION} from "../enums/publication";

const LISTS_METHODS =  Object.values(USER_PROFILES_METHOD)
const LIST_PUBLICATIONS =   Object.values(USER_PROFILE_PUBLICATION);

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
