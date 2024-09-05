export class BaseService {
  constructor(repository) {
    this.repository = repository;
  }

  /**
   * @param object {object}
   * @return {Promise<void>}
   */
  async upsert(object) {
    return this.repository.upsertAsync({
      _id: object?._id
    }, {
      $set: object
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
