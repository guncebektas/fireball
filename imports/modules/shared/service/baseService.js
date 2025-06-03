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

  list(selector) {
    return this.repository.find(selector).fetchAsync();
  }

  upsert(formData) {
    return this.repository.upsertAsync(formData);
  }

  delete(select) {
    return this.repository.removeAsync(select);
  }
}
