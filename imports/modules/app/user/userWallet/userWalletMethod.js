import {createMethod} from 'meteor/jam:method';
import {userWalletService} from "./userWalletService";
import {z} from "zod";
import {USER_WALLET_METHOD} from "./enums/method";

export const userWalletMethod = {
  getCustomer: createMethod({
    name: USER_WALLET_METHOD.GET_CUSTOMER,
    serverOnly: true,
    async run() {
      return userWalletService.getCustomer(this.userId);
    }
  }),

  postCustomer: createMethod({
    name: USER_WALLET_METHOD.POST_CUSTOMER,
    serverOnly: true,
    async run() {
      return userWalletService.postCustomer(this.userId);
    }
  }),

  increaseCustomerStamp: createMethod({
    name: USER_WALLET_METHOD.INCREASE_STAMP_COUNT,
    schema: z.object({
      amount: z.number()
    }),
    serverOnly: true,
    async run({amount}) {
      return userWalletService.increaseStampCount(this.userId, amount);
    }
  })
}
