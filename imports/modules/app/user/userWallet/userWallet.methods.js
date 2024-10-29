import {createMethod} from 'meteor/jam:method';
import {userWalletService} from "./userWalletService";
import {oneRowSchema} from "../../../shared/schemas/oneRowSchema";
import {z} from "zod";

export const userWalletMethods = {
  getCustomer: createMethod({
    name: 'userWallet.getCustomer',
    serverOnly: true,
    async run() {
      return userWalletService.getCustomer(this.userId);
    }
  }),

  increaseCustomerStamp: createMethod({
    name: 'userWallet.increaseStampCount',
    schema: z.object({
      amount: z.number()
    }),
    serverOnly: true,
    async run({amount}) {
      return userWalletService.increaseStampCount(this.userId, amount);
    }
  })
}
