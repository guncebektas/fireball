import {RATE_LIMITER} from '../enums/rateLimitter.js';
import {FRANCHISE_METHOD} from "../enums/method.franchises";

const LISTS_METHODS =  Object.values(FRANCHISE_METHOD)

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
