import {RATE_LIMITER} from '../enums/rateLimitter.js';
import {STORE_METHOD} from "../enums/method.stores";

const LISTS_METHODS =  Object.values(STORE_METHOD)

DDPRateLimiter.addRule({
  name() {
    return [
      ...LISTS_METHODS,
    ];
  },
  connectionId() {
    return true;
  }
}, RATE_LIMITER.REQUEST_COUNT, RATE_LIMITER.TIME_INTERVAL);
