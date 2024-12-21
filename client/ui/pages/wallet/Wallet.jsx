import React, {useCallback, useEffect, useState} from 'react';
import {Button} from 'flowbite-react';
import {Slider} from "../../components/slider/Slider";
import {Meteor} from "meteor/meteor";
import ScratchCardModal from "../../components/modals/ScratchCardModal/ScratchCardModal";
import {userWalletMethod} from "../../../../imports/modules/app/user/userWallet/userWalletMethod";
import {QRCodeModal} from "../../components/modals/QRCodeModal/QRCodeModal";
import {ScratchCardButton} from "../../components/buttons/ScratchCardButton";
import {QRCodeButton} from "../../components/buttons/QRCodeButton";
import {WalletBalance} from "./WalletBalance";
import {useStampCountStore} from '../../stores/useStampCountStore';
import ProgressBar from "./ProgressBar";
import {useConfettiStore} from "../../stores/useConfettiStore";
import {StarShapedConfetti} from "../../components/confetti/StarShappedConfetti";
import {CartButton} from "../../components/buttons/CartButton";
import {SelectedStore} from "../stores/SelectedStore";

export const Wallet = () => {
  const {wallet} = Meteor.settings.public.pages;
  const useWallet = false;

  const {setStampCount} = useStampCountStore();
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {showConfetti, closeConfetti} = useConfettiStore();

  useEffect(() => {
    closeConfetti();

    userWalletMethod.getCustomer()
      .then(response => {
        console.log(response);

        if (response.data.status) {
          setStampCount(response.data.stampCount);
          setBalance(response.data.balance);
        } else {
          setStampCount(0);
          setBalance(0);
        }
      })
      .catch(error => {
        console.error("Error fetching customer data:", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [setStampCount]);

  const addMoney = useCallback((amount) => {
    setBalance((prevBalance) => prevBalance + amount);
  }, []);

  if (loading) {
    // return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-col space-y-4">
      <SelectedStore/>

      <div className="mb-3">
        <Slider carousel={wallet.carousel} showCaption={false} indicators={false}/>
      </div>

      <ProgressBar/>

      <div className="flex justify-between">
        <div className="flex space-x-1">
          <ScratchCardButton/>
          <QRCodeButton/>
        </div>
        <CartButton/>
      </div>

      <ScratchCardModal/>
      <QRCodeModal/>

      {showConfetti && <StarShapedConfetti/>}

      {useWallet && <WalletBalance balance={balance} onAddMoney={addMoney}/>}
    </div>
  );
};
