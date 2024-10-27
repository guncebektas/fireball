import {createMethod} from 'meteor/jam:method';
import {userWalletService} from "./userWalletService"; // can import { Methods } from 'meteor/jam:method' instead and use Methods.create if you prefer

export const userWalletMethods = {
  getCustomer: createMethod({
    name: 'userWallet.getCustomer',
    async run() {
      return userWalletService.getCustomer(this.userId);
    }
  })
}
