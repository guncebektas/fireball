import {createMethod} from 'meteor/jam:method';
import {userWalletService} from "./userWalletService";

export const userWalletMethods = {
  getCustomer: createMethod({
    name: 'userWallet.getCustomer',
    async run() {
      return userWalletService.getCustomer(this.userId);
    }
  })
}
