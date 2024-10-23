export class BaseService {
  constructor({repository, isFeatureEnabled}) {
    this.repository = repository;

    // Default to always enabling if no feature check is provided
    this.isFeatureEnabled = isFeatureEnabled || (() => true);

    // Automatically wrap all methods with the feature check
    this.wrapMethods();
  }

  wrapMethods() {
    const methodNames = Object
      .getOwnPropertyNames(Object.getPrototypeOf(this))
      .filter(methodName => typeof this[methodName] === 'function' && methodName !== 'constructor');

    methodNames.forEach(methodName => {
      const originalMethod = this[methodName];

      // Override the method to include feature check
      this[methodName] = async (...args) => {
        if (!this.isFeatureEnabled()) {
          return; // Skip execution if feature is disabled
        }

        return originalMethod.apply(this, args); // Execute the original method
      };
    });
  }

  /**
   * @param object {object}
   * @return {Promise<void>}
   */
  async upsert(object) {
    return this.repository.upsertAsync({
      _id: object?._id
    }, {
      $set: {
        ...object,
        ...{
          organizationId: Meteor.settings.public.app._id
        }
      }
    });
  }

  /**
   * @param _id {string}
   * @return {Promise<number>}
   */
  async remove(_id) {
    return this.repository.removeAsync(_id);
  }
}
