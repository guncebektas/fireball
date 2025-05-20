import {Random} from 'meteor/random';
import {Log} from "meteor/logging";

/**
 * Base class containing repository functionality
 */
export class BaseRepository {
  /**
   * @constructor
   * @param collection {Mongo.Collection}
   */
  constructor(collection) {
    /**
     * @protected
     * @type {Mongo.Collection}
     */
    this._collection = collection;

    /**
     * @private
     */
    this._collectionName = collection._name;

    if (Meteor.isServer) {
      /**
       * @protected
       */
      this._bulkOperation = null; // Will be created by first insert/update function
    }
  }

  /** region find */
  /**
   * Finds documents based on provided selector and options
   * @param selector {string|object} [optional]
   * @param options {object} [optional]
   * @returns {Mongo.Cursor}
   */
  find(selector = {}, options = {}) {
    // XXX: limit data with organizationId for publications
    if (Meteor.isServer) {
      selector = {...selector, ...{organizationId: Meteor.settings.public.app._id}}
    }

    return this._collection.find(selector, options);
  }

  /**
   * Finds one document only
   * @deprecated
   * @param selector {string|object}
   * @param options {object} [optional]
   * @returns {object}
   */
  findOne(selector = {}, options = {}) {
    // XXX: limit data with organizationId for publications
    if (Meteor.isServer) {
      selector = {...selector, ...{organizationId: Meteor.settings.public.app._id}}
    }

    return this._collection.findOne(selector, options);
  }

  /**
   * @async
   * @param selector {string|object} [optional]
   * @param options {object} [optional]
   * @return {Promise<*>}
   */
  async findOneAsync(selector = {}, options = {}) {
    // XXX: limit data with organizationId for publications
    if (Meteor.isServer) {
      if (typeof selector === 'string') {
        selector = {
          ...{_id: selector},
          ...{organizationId: Meteor.settings.public.app._id}
        }
      } else {
        selector = {
          ...selector,
          ...{organizationId: Meteor.settings.public.app._id}
        }
      }
    }

    return this._collection.findOneAsync(selector, options);
  }

  /**
   * @deprecated
   * @param selector {string|object}
   * @param options {object}
   * @return {Mongo.Cursor<unknown, Mongo.DispatchTransform<{}["transform"], unknown, unknown>>}
   */
  findRemoved(selector = {}, options = {}) {
    selector = {...selector, ...{removed: {$exists: true}}};

    // XXX: limit data with organizationId for publications
    if (Meteor.isServer) {
      selector = {...selector, ...{organizationId: Meteor.settings.public.app._id}}
    }

    return this._collection.find(selector, options);
  }

  /**
   * @deprecated
   * @param selector {string|object}
   * @param options {object}
   * @return {Mongo.Cursor<unknown, Mongo.DispatchTransform<{}["transform"], unknown, unknown>>}
   */
  findNotRemoved(selector = {}, options = {}) {
    selector = {...selector, ...{removed: {$exists: false}}};

    // XXX: limit data with organizationId for publications
    if (Meteor.isServer) {
      selector = {...selector, ...{organizationId: Meteor.settings.public.app._id}}
    }

    return this._collection.find(selector, options);
  }

  /**
   * @deprecated
   * @param selector {array}
   * @returns {*}
   */
  aggregate(selector) {
    // XXX: limit data with organizationId for publications
    if (Meteor.isServer) {
      selector = {...selector, ...{organizationId: Meteor.settings.public.app._id}}
    }

    return this._collection.aggregate(selector);
  }

  /** endregion find */

  /** region insert */
  /**
   * Inserts a document and returns the id of it
   * @deprecated
   * @param document {object}
   * @returns {string}
   */
  insert(document) {
    document = {...document, ...{organizationId: Meteor.settings.public.app._id}}
    return this._collection.insert(document);
  }

  /**
   * @param document {object}
   * @return {Promise<string>}
   */
  async insertAsync(document) {
    document = {...document, ...{organizationId: Meteor.settings.public.app._id}}
    return await this._collection.insertAsync(document);
  }

  /** endregion find */

  /** region upsert */
  /**
   * Inserts or updates a document
   * @deprecated
   * @param selector {string|object}
   * @param updateObject {object}
   * @param options {object}
   */
  upsert(selector, updateObject, options = null) {
    updateObject.$set = {...updateObject.$set, ...{organizationId: Meteor.settings.public.app._id}}
    this._collection.upsert(selector, updateObject, options);
  }

  /**
   * @param selector {string|object}
   * @param updateObject {object}
   * @param options {object}
   * @return {Promise<void>}
   */
  async upsertAsync(selector, updateObject, options = null) {
    updateObject.$set = {...updateObject.$set, ...{organizationId: Meteor.settings.public.app._id}}
    await this._collection.upsertAsync(selector, updateObject, options);
  }

  /** endregion upsert */

  /** region update */
  /**
   * Updates a document
   * @deprecated
   * @param selector {string|object}
   * @param updateObject {object}
   * @param options {object}
   * @returns {number}
   */
  update(selector, updateObject, options = null) {
    return this._collection.update(selector, updateObject, options);
  }

  /**
   * @param selector {string|object}
   * @param updateObject {object}
   * @param options {object}
   * @returns {Promise<number>}
   */
  async updateAsync(selector, updateObject, options = null) {
    updateObject.$set = {...updateObject.$set, ...{organizationId: Meteor.settings.public.app._id}}
    return this._collection.update(selector, updateObject, options);
  }

  /**
   * Updates all matching documents
   * @deprecated
   * @param selector {string|object}
   * @param updateObject {object}
   * @returns {number}
   */
  updateMany(selector, updateObject) {
    return this._collection.update(selector, updateObject, {multi: true});
  }

  /**
   * @param selector {string|object}
   * @param updateObject {object}
   * @return {Promise<number>}
   */
  async updateManyAsync(selector, updateObject) {
    return this._collection.update(selector, updateObject, {multi: true});
  }

  /**
   * Updates id of provided document
   * @param document {object}
   * @param newId {string}
   * @return {Promise<string>}
   */
  async updateAsyncId(document, newId) {
    await this.removeAsync(document._id);

    document._id = newId;

    return this.insertAsync(document);
  }

  /** endregion update */

  /** region remove */
  /**
   * Removes a document with id or selector
   * @deprecated
   * @param selector {string|object}
   * @returns {number} affected row count
   */
  remove(selector) {
    return this._collection.remove(selector);
  }

  /**
   * @param selector {string|object}
   * @return {Promise<number>}
   */
  async removeAsync(selector) {
    return this._collection.removeAsync(selector);
  }

  /** endregion remove */

  /**
   * Counts the number of documents for provided selector
   * @deprecated
   * @param selector {object}
   * @param options {object}
   * @returns {number}
   */
  count(selector = {}, options = {}) {
    return this.find(selector, options).count();
  }

  /**
   * Creates a new 'ordered' bulk operation
   * IMPORTANT: Bulk operations are not reusable. We should create a new one after each bulk execute call!
   * @returns {Mongo.Collection}
   * @private
   */
  _createBulkOperation() {
    return this._collection.rawCollection().initializeOrderedBulkOp();
  }

  /**
   * Creates a new 'unordered' bulk operation
   * IMPORTANT: Bulk operations are not reusable. We should create a new one after each bulk execute call!
   * @returns {*}
   * @private
   */
  _createUnorderedBulkOperation() {
    return this._collection.rawCollection().initializeUnorderedBulkOp();
  }

  /**
   * Inserts a document as a bulk operation
   * @link https://docs.meteor.com/api/collections.html#Mongo-Collection
   * @param document {object}
   */
  insertBulk(document) {
    if (Meteor.isClient) {
      Log.error(`Bulk operations for ${this._collectionName} can only be called from server side`);
      return;
    }

    if (this._bulkOperation === null) {
      this._bulkOperation = this._createBulkOperation();
    }

    //
    // IMPORTANT
    // Bulk insert creates 'MONGO' _id which creates reactivity problem in UI.
    // We better create it with Meteor style 'STRING' _id.
    //
    if (isUndefined(document._id)) // Let caller provide an id
    {
      document._id = this.newId();
    }

    this._bulkOperation.insert(document);
  }

  /**
   * Updates a document as a bulk operation
   * @param selector {object}
   * @param updateObject {object}
   * @param options {object}
   */
  updateBulk(selector, updateObject, options = null) {
    if (Meteor.isClient) {
      Log.error(`Bulk operations for ${this._collectionName} can only be called from server side`);
      return;
    }

    if (this._bulkOperation === null) {
      this._bulkOperation = this._createBulkOperation();
    }

    delete updateObject._id; // In case we were provided with a document, updating id is not possible

    //
    // Convert object to an update object
    //
    this._bulkOperation.find(selector).update(updateObject, options);
  }

  /**
   * Removes a document as a bulk operation
   * @param selector {object}
   */
  removeBulk(selector) {
    if (Meteor.isClient) {
      Log.error(`Remove bulk operations for ${this._collectionName} can only be called from server side`);
      return;
    }

    if (this._bulkOperation === null) {
      this._bulkOperation = this._createUnorderedBulkOperation();
    }

    this._bulkOperation.find(selector).delete();
  }

  /**
   * Executes the bulk operation
   */
  executeBulk() {
    if (Meteor.isClient) {
      Log.fatal(`Bulk operations for ${this._collectionName} can only be called from server side`);
      return;
    }

    if (this._bulkOperation === null) {
      return;
    }

    //
    // Execute bulk operation and delete it for insert/update functions to create a new one
    //
    try {
      this._bulkOperation.execute();
    } catch (e) {
      Log.error(e.toString());
    } finally {
      this._bulkOperation = null;
    }
  }

  /**
   * @return {string}
   */
  newId() {
    return Random.id();
  }
}
