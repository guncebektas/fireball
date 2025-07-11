import { userWalletMethod } from '../../../imports/modules/app/user/userWallet/userWalletMethod';
import { useStampCountStore } from '../stores/useStampCountStore';
import { useState, useCallback } from 'react';

export const useWalletData = () => {
  const { setStampCount } = useStampCountStore();
  const [balance, setBalance] = useState(0);

  const refreshWalletData = async () => {
    try {
      setStampCount(0);
      setBalance(0);

      // await userWalletMethod.postCustomer();

      const response = await userWalletMethod.getCustomer();
      if (response.status) {
        setStampCount(response.data.stampCount);
        setBalance(response.data.balance);
      } else {
        setStampCount(0);
        setBalance(0);
      }
    } catch (error) {
      console.error("Error fetching customer data:", error);
      throw error;
    }
  };

  const addMoney = useCallback((amount) => {
    setBalance((prevBalance) => prevBalance + amount);
  }, []);

  return { refreshWalletData, balance, addMoney };
};
