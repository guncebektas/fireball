import {Log} from "meteor/logging";
import {Meteor} from "meteor/meteor";

export class HtmlUtility {
  /**
   * Capitalizes the first letter of each word in a string and makes the rest lowercase.
   * Handles words separated by spaces and forward slashes.
   * Uses Turkish locale for proper handling of Turkish characters
   * @param {string} str - The string to capitalize
   * @returns {string} The string with each word capitalized
   */
  static CapitalizeWordLetters(str) {
    if (!str) return str;
    return str
      .split(/([ /])/) // Split by space or slash, but keep the delimiters
      .map(part => {
        // Skip if the part is a space or slash
        if (part === ' ' || part === '/') return part;
        // Capitalize the word
        return part.charAt(0).toLocaleUpperCase('tr-TR') + part.slice(1).toLocaleLowerCase('tr-TR');
      })
      .join('');
  }

  static PadPhoneNumber(phoneNumber, format = false) {
    if (!phoneNumber) return phoneNumber;
    // Remove any non-digit characters and pad with leading zeros to make it 12 digits
    const cleanedNumber = phoneNumber.replace(/\D/g, '').padStart(11, '0');

    // Format the number with spaces
    if (format) {
      return cleanedNumber.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '$1($2) $3 $4 $5');
    }

    return cleanedNumber;
  }

  static ImageUrl(url) {
    return `https://ritapos-files.s3.eu-central-1.amazonaws.com/${url}`;
  }

  static ImageUrlOnError(url) {
    Log.error(`An error occurred when loading ${HtmlUtility.ImageUrl(url)}`);

    const brand = Meteor.settings.public.app["brand"];
    return `/online/${brand}/icons/favicon-144.png`;
  }
}
