import {isDefined} from '../functions/isDefined';

/**
 * Finds device type of current user
 * @locus client
 */
export class DeviceUtility {
  /**
   * @locus client
   * @returns {boolean}
   */
  static isMobile() {
    return window.matchMedia('only screen and (max-width: 760px)').matches;
  }

  /**
   * @locus client
   * @return {boolean}
   */
  static isAndroid() {
    const ua = navigator.userAgent.toLowerCase();
    return ua.indexOf('android') > -1; //&& ua.indexOf("mobile");
  }

  /**
   * @locus client
   * @returns {boolean}
   */
  static isIos() {
    const ua = navigator.userAgent.toLowerCase();
    return ua.indexOf('ipad') > -1 || ua.indexOf('iphone') > -1;
  }

  /**
   * @locus client
   * @returns {boolean}
   */
  static isChrome() {
    const ua = navigator.userAgent.toLowerCase();
    return ua.indexOf('chrome') > -1;
  }

  /**
   * @locus client
   * @returns {boolean}
   */
  static isSpeechRecognitionAvailable() {
    // TODO: Make it workable on Android devices
    if (DeviceUtility.isMobile()) {
      return false;
    }

    return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
  }

  static isServiceWorkerAvailable() {
    if (isDefined(window.Cypress)) {
      return false;
    }

    return typeof navigator.serviceWorker !== "undefined";
  }
}
