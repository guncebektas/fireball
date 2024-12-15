import {RATE_LIMITER} from '../enums/rateLimitter.js';
import {ticketsMethod} from "../ticketMethod.js";
import {FAQS_METHOD} from "../../faqs/enums/method";
import {FAQS_PUBLICATION} from "../../faqs/enums/publication";
import {TICKET_METHOD} from "../enums/method";
import {TICKET_PUBLICATION} from "../enums/publication";

const LISTS_METHODS =  Object.values(TICKET_METHOD)
const LIST_PUBLICATIONS =   Object.values(TICKET_PUBLICATION);

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
