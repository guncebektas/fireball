/**
 * SoftDelete configuration
 */
export interface SoftDeleteConfig {
  deleted: string;
  deletedAt: string;
  autoFilter: boolean;
  overrideRemove: boolean;
}

/**
 * Configures the settings by merging the provided options with the existing configuration.
 *
 * @param options - The options to configure.
 * @param options.deleted - The field name used for the soft deletion flag
 * @param options.deletedAt - The field name used for the deletedAt timestamp
 * @param options.autoFilter - Automatically enable or disable filtering queries with the deleted flag
 * @param options.overrideRemove - Automatically override or prevent overriding the remove method to make it a soft delete
 * @returns The updated configuration object.
 */
export function configure(options: {
  deleted?: string;
  deletedAt?: string;
  autoFilter?: boolean;
  overrideRemove?: boolean;
}): SoftDeleteConfig;

/**
 * SoftDelete utility that contains the configuration object and configure method.
 */
export const SoftDelete: {
  config: SoftDeleteConfig;
  configure: typeof configure;
};

/**
 * Adds a `deleted` property with a value of `false` to the `selector` object
 * if the object does not already have this property and meets certain conditions.
 *
 * @param {Object} selector - The object to which the `deleted` property may be added.
 * @returns {void}
 */
export function addDeleted(selector: { [key: string]: any }): void;

declare module 'meteor/mongo' {
  module Mongo {
    interface Collection<T> {
      /**
       * Asynchronously performs a "soft remove" operation on documents in the collection.
       * Updates documents that match the selector by marking them as deleted.
       *
       * @param selector - The MongoDB query selector to identify documents for the soft removal operation.
       * @param options - Optional settings for the removal operation.
       * @param options.multi - If true, updates all documents matching the selector. Defaults to true.
       * @param options.upsert - If true, inserts a document if no match is found. Defaults to false.
       * @returns A promise that resolves to the number of documents soft removed (updated).
       */
      softRemoveAsync(selector: Mongo.Selector<T>, options?: { multi?: boolean; upsert?: boolean }): Promise<number>;

       /**
       * Asynchronously recovers documents that were previously soft deleted.
       * Updates documents by setting the `deleted` flag to false and optionally unsetting the `deletedAt` field.
       *
       * @param selector - The MongoDB query selector to identify the documents to recover.
       * @returns A promise that resolves to the number of documents successfully recovered (updated).
       */
      recoverAsync(selector: Mongo.Selector<T>): Promise<number>;
    }
  }
}
