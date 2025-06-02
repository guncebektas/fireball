import { Meteor } from "meteor/meteor";
import React, { useCallback, useEffect, useState } from 'react';
import { CartButton } from "../../components/buttons/CartButton";
import { QRCodeButton } from "../../components/buttons/QRCodeButton";
import { ScratchCardButton } from "../../components/buttons/ScratchCardButton";
import { StarShapedConfetti } from "../../components/confetti/StarShappedConfetti";
import { QRCodeModal } from "../../components/modals/QRCodeModal/QRCodeModal";
import ScratchCardModal from "../../components/modals/ScratchCardModal/ScratchCardModal";
import { Slider } from "../../components/slider/Slider";
import { useWalletData } from "../../hooks/useWalletData";
import { useConfettiStore } from "../../stores/useConfettiStore";
import { useStampCountStore } from '../../stores/useStampCountStore';
import { SelectedStore } from "../stores/SelectedStore";
import ProgressBar from "./ProgressBar";
import { WalletBalance } from "./WalletBalance";

export const Wallet = ({showBanner = true}) => {
  const {wallet} = Meteor.settings.public.pages;
  const useWallet = false;

  const {setStampCount} = useStampCountStore();
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {showConfetti, closeConfetti} = useConfettiStore();
  const { refreshWalletData } = useWalletData();

  const initializeWallet = async () => {
    try {
      await refreshWalletData();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    closeConfetti();
    initializeWallet()
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
      {showBanner ?
        <>
          <SelectedStore showIcon={true}/>
          <div className="mb-3">
            <Slider carousel={wallet.carousel} showCaption={false} indicators={false}/>
          </div>
        </>
        :
        <div className="px-6">
          <SelectedStore showIcon={false}/>
        </div>
      }

      <ProgressBar/>

      <div className="flex space-x-6 px-6">
        <ScratchCardButton/>
        <QRCodeButton/>
      </div>

      <ScratchCardModal/>
      <QRCodeModal/>

      {showConfetti && <StarShapedConfetti/>}

      {useWallet && <WalletBalance balance={balance} onAddMoney={addMoney}/>}
    </div>
  );
};
