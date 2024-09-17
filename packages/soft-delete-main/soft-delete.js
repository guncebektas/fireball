import { Mongo } from 'meteor/mongo';
import { check, Match } from 'meteor/check';

const autoFilterMethods = ['find', 'findOne', 'findOneAsync', 'count', 'countAsync', 'countDocuments', 'estimatedDocumentCount'];

/**
 * @typedef {Object} SoftDeleteConfig
 * @property {string} deleted - The field name used for the soft deletion flag
 * @property {string} deletedAt - The field name used for the deletedAt timestamp
 * @property {boolean} autoFilter - Automatically filter queries with the deleted flag
 * @property {boolean} overrideRemove - Automatically override the remove method to make it a soft delete
 */

/**
 * Configuration object for soft delete.
 *
 * @type {SoftDeleteConfig}
 */
const config = {
  deleted: 'deleted',
  deletedAt: '',
  autoFilter: true,
  overrideRemove: true,
};

/**
 * Configures the settings by merging the provided options with the existing configuration.
 *
 * @param {Object} options - The options to configure.
 * @param {string} [options.deleted] - The field name used for the soft deletion flag
 * @param {string} [options.deletedAt] - The field name used for the deletedAt timestamp
 * @param {boolean} [options.autoFilter] - Automatically enable or disable filtering queries with the deleted flag. Defaults to true.
 * @param {boolean} [options.overrideRemove] - Automatically override or prevent overriding the remove method to make it a soft delete. Defaults to true.
 * @returns {SoftDeleteConfig} The updated configuration object.
 */
const configure = options => {
  check(options, {
    deleted: Match.Maybe(String),
    deletedAt: Match.Maybe(String),
    autoFilter: Match.Maybe(Boolean),
    overrideRemove: Match.Maybe(Boolean),
  });

  return Object.assign(config, options);
};

/**
 * Adds a `deleted` property with a value of `false` to the `selector` object
 * if the object does not already have this property and meets certain conditions.
 *
 * @param {Object} selector - The object to which the `deleted` property may be added.
 * @returns {void}
 */
export const addDeleted = selector => {
  if (selector[config.deleted]) return;

  if (typeof selector === 'string') {
    selector = { _id: selector };
  }

  selector[config.deleted] = false;
  return;
};

/**
 * SoftDelete configuration
 *
 * @type {Object}
 * @property {SoftDeleteConfig} config - The current soft delete configuration
 * @property {Function} configure - Method to update the configuration
 */
export const SoftDelete = Object.freeze({
  config,
  configure
});

/**
 * Asynchronously performs a "soft remove" operation on documents in the MongoDB collection.
 * This method updates the documents that match the given selector, marking them as "deleted"
 * rather than physically removing them from the collection.
 *
 * @async
 * @function
 * @name Mongo.Collection#softRemoveAsync
 * @param {Object} selector - The MongoDB query selector to identify documents for the soft removal operation.
 * @param {Object} [options={}] - Optional settings for the removal operation.
 * @param {boolean} [options.multi=true] - If true, all documents matching the selector will be updated. Defaults to true.
 * @param {boolean} [options.upsert=false] - If true, will insert a document if no documents match the selector. Defaults to false.
 * @returns {Promise<number>} - A promise that resolves to the number of documents soft removed (updated).
 * @throws {Error} - Throws an error if the operation fails.
 */
Mongo.Collection.prototype.softRemoveAsync = async function(selector, options = {}) {
  const { deleted, deletedAt } = config;
  const now = new Date();
  return this.updateAsync(selector, { $set: { [deleted]: true, updatedAt: now, ...(deletedAt && {[deletedAt]: now}) }}, {  multi: true, ...options });
}

/**
 * Asynchronously recovers documents that were previously soft deleted.
 * This method updates the documents that match the given selector by setting the `deleted` flag to `false`
 * and removing the `deletedAt` timestamp, if it exists.
 *
 * @async
 * @function
 * @name Mongo.Collection#recoverAsync
 * @param {Object} selector - The MongoDB query selector to identify the documents to be recovered.
 * @returns {Promise<number>} - A promise that resolves to the number of documents successfully recovered (updated).
 * @throws {Error} - Throws an error if the operation fails.
 */
Mongo.Collection.prototype.recoverAsync = async function(selector) {
  const { deleted, deletedAt } = config;
  return this.updateAsync(selector, { $set: { [deleted]: false, updatedAt: new Date() }, ...(deletedAt && { $unset: { [deletedAt]: '' } })}, { multi: true });
}

Meteor.startup(() => {
  const { overrideRemove, autoFilter, deleted, deletedAt } = config;

  if (overrideRemove) {
    const originalRemove = Mongo.Collection.prototype.removeAsync;
    Mongo.Collection.prototype.removeAsync = async function(selector, options = {}) {
      if (options.soft === false) {
        return originalRemove.call(this, selector);
      }

      return this.updateAsync(selector, { $set: { [deleted]: true, updatedAt: new Date(), ...(deletedAt && {[deletedAt]: new Date()}) }}, { multi: true });
    }
  }

  if (autoFilter) {
    for (const method of autoFilterMethods) {
      const originalMethod = Mongo.Collection.prototype[method];

      Mongo.Collection.prototype[method] = function(selector = {}, options = {}) {
        addDeleted(selector);
        return originalMethod.call(this, selector, options);
      }
    }
  }
});





