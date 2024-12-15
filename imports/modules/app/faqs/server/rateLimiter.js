import {RATE_LIMITER} from '../enums/rateLimitter.js';
import {FAQS_METHOD} from "../enums/method";
import {FAQS_PUBLICATION} from "../enums/publication";

const LISTS_METHODS =  Object.values(FAQS_METHOD)
const LIST_PUBLICATIONS =   Object.values(FAQS_PUBLICATION);

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
