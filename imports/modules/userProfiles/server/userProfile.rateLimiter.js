import {RATE_LIMITER} from '../enums/rateLimitter.js';
import {profileSaveOtp, profileSetProfilePicture, profileUpdate} from "../userProfile.methods.js";

const LISTS_METHODS = [
  profileUpdate,
  profileSaveOtp,
  profileSetProfilePicture
].map(method => method.name);

DDPRateLimiter.addRule({
  name(name) {
    return LISTS_METHODS.includes(name);
  },
  connectionId() {
    return true;
  }
}, RATE_LIMITER.REQUEST_COUNT, RATE_LIMITER.TIME_INTERVAL);
