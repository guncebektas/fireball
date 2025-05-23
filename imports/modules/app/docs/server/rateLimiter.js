import {RATE_LIMITER} from '../enums/rateLimitter.js';
import {DOCS_METHOD} from "../enums/method";
import {DOCS_PUBLICATION} from "../enums/publication";

const LISTS_METHODS =  Object.values(DOCS_METHOD)
const LIST_PUBLICATIONS =   Object.values(DOCS_PUBLICATION);

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
