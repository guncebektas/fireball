import {RATE_LIMITER} from '../enums/rateLimitter.js';
import {IMAGE_PUBLICATION} from "../enums/publication";
import {IMAGE_METHOD} from "../enums/method";

const LISTS_METHODS =  Object.values(IMAGE_METHOD.GET);
const LIST_PUBLICATIONS =   Object.values(IMAGE_PUBLICATION);

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
