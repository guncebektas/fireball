import {RATE_LIMITER} from '../enums/rateLimitter.js';
import {NOTIFICATIONS_METHODS} from "../enums/method";
import {NOTIFICATIONS_PUBLICATION} from "../enums/publication";

const LISTS_METHODS =  Object.values(NOTIFICATIONS_METHODS)
const LIST_PUBLICATIONS =   Object.values(NOTIFICATIONS_PUBLICATION);

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
