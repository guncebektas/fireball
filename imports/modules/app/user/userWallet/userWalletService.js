import ApiServiceInstance from "../../../infrastructure/axios/apiServiceInstance";
import {Log} from "meteor/logging";
import {userProfileRepository} from "../userProfiles/userProfileRepository";

class UserWalletService extends ApiServiceInstance {
  constructor({userProfileRepository}) {
    super();

    this.userProfileRepository = userProfileRepository;

    this.url = `${this.baseUrl}/api/v1/customers/`;
  }

  async getCustomer(userId) {
    const endpoint = `${this.url}${userId}`
    return this.get(endpoint);
  }

  async postCustomer(userId) {
    const endpoint = `${this.url}${userId}/create`
    Log.debug(`Sending customer with id ${userId}`);
    const user = await this.userProfileRepository.findOneAsync(userId);

    return this.post(endpoint, {
      token: Meteor.settings.private.token,
      _id: user._id,
      storeId: Meteor.settings.public.app._id,
      name: user.firstname || '-',
      surname: user.lastname || '-',
      phone: user.phoneNumber || '-',
      email: user.email || '-'
    });
  }

  async increaseStampCount(userId, amount) {
    const _self = this;

    const endpoint = `${this.url}${userId}/increase-stamp-count`
    await this.put(endpoint, {amount})
      .then(async response => {
        await _self.userProfileRepository.updateAsync(userId, {
          $set: {
            scratchedAt: new Date()
          }
        }).then(response => {
          console.log(response);
        }).catch(error => {
          console.error(error);
          Log.error(error);
        });

        return response;
      }).catch(error => {
        Log.error(error);
      });
  }
}

export const userWalletService = new UserWalletService({
  userProfileRepository: userProfileRepository
});
