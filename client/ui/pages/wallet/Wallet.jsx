import React, {useEffect, useState} from 'react';
import {Button} from 'flowbite-react';
import {Slider} from "../../components/slider/Slider";
import {useTracker} from "meteor/react-meteor-data";
import {Meteor} from "meteor/meteor";
import {USER_PROFILE_PUBLICATION} from "../../../../imports/modules/app/user/userProfiles/enums/publication";
import {userProfileRepository} from "../../../../imports/modules/app/user/userProfiles/userProfileRepository";
import ScratchCardModal from "../../components/modals/ScratchCardModal";
import {userWalletMethod} from "../../../../imports/modules/app/user/userWallet/userWalletMethod";
import {QRCodeModal} from "../../components/modals/QRCodeModal";
import {Log} from "meteor/logging";
import {ScratchCardButton} from "../../components/buttons/ScratchCardButton";
import {QRCodeButton} from "../../components/buttons/QRCodeButton";
import {WalletBalance} from "./WalletBalance";
import {useStampCountStore} from '../../stores/useStampCountStore';
import ProgressBar from "./ProgressBar";
import {useConfettiStore} from "../../stores/useConfettiStore";
import {StarShapedConfetti} from "../../components/confetti/StarShappedConfetti";
import {CartButton} from "../../components/buttons/CartButton";

export const Wallet = () => {
  const {wallet} = Meteor.settings.public.pages;
  const useWallet = false;

  const targetStampCount = 10;
  const {stampCount, setStampCount, increaseStampCount} = useStampCountStore();
  const [currentBalance, setBalance] = useState(0);

  const showConfetti = useConfettiStore((state) => state.showConfetti);

  const user = useTracker(() => Meteor.user(), []);

  useTracker(() => {
    const subscription = Meteor.subscribe(USER_PROFILE_PUBLICATION.ME);
    if (subscription.ready()) {
      const userProfile = userProfileRepository.findOne({_id: Meteor.userId()}) || {};

      // increaseStampCount(userProfile.stamp);
      setBalance(userProfile.balance);
    }
  }, [user]);

  const fetchCustomer = async () => {
    try {
      return userWalletMethod.getCustomer();
    } catch (error) {
      Log.error(error);
    }
  };

  const fetchAndSetStampCount = function() {
    fetchCustomer()
      .then(response => {
        console.log(response);
        setStampCount(response.data.stampCount);
      })
      .catch(error => {
        console.error("Error fetching customer data:", error);
      });
  }

  useEffect(() => {
    // Call the function immediately
    fetchAndSetStampCount();
  }, []);

  const addMoney = (amount) => {
    setBalance((prevBalance) => prevBalance + amount);
  };

  return (
    <>
      <div className="flex flex-col space-y-4">
        <div className="mb-3">
          <Slider carousel={wallet.carousel} showCaption={false} indicators={false}/>
        </div>

        <ProgressBar target={targetStampCount} current={stampCount}/>

        <Button.Group>
          <ScratchCardButton/>
          <QRCodeButton/>

          <CartButton/>
        </Button.Group>

        <ScratchCardModal/>
        <QRCodeModal/>

        {showConfetti && (
          <StarShapedConfetti/>
        )}

        {useWallet ? <WalletBalance balance={currentBalance} onAddMoney={addMoney}/> : ''}
      </div>
    </>
  );
};
