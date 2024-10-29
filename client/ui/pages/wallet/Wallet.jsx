import React, {useEffect, useState} from 'react';
import {Button} from 'flowbite-react';
import {Slider} from "../../components/slider/Slider";
import {useTracker} from "meteor/react-meteor-data";
import {Meteor} from "meteor/meteor";
import {USER_PROFILE_PUBLICATION} from "../../../../imports/modules/app/user/userProfiles/enums/publication";
import {userProfileRepository} from "../../../../imports/modules/app/user/userProfiles/userProfileRepository";
import ScratchCardModal from "../../components/modals/ScratchCardModal";
import {userWalletMethods} from "../../../../imports/modules/app/user/userWallet/userWallet.methods";
import {QRCodeModal} from "../../components/modals/QRCodeModal";
import {Log} from "meteor/logging";
import {ScratchCardButton} from "../../components/buttons/ScratchCardButton";
import {QRCodeButton} from "../../components/buttons/QRCodeButton";
import {WalletBalance} from "./WalletBalance";
import {useStampCount} from '../../stores/useStampCount';
import ProgressBar from "./ProgressBar";
import {useConfettiStore} from "../../stores/useConfettiStore";
import {StarShapedConfetti} from "../../components/confetti/StarShappedConfetti";

export const Wallet = () => {
  const {carousel} = Meteor.settings.public.pages.aboutUs;
  const wallet = false;

  const targetStampCount = 15;
  const {stampCount, setStampCount, increaseStampCount} = useStampCount();
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

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        return userWalletMethods.getCustomer();
      } catch (err) {
        Log.error(err);
      }
    };

    const intervalId = setInterval(() => {
      fetchCustomer()
        .then(response => {
          setStampCount(response.data.stampCount);
        });
    }, 5000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const addMoney = (amount) => {
    setBalance((prevBalance) => prevBalance + amount);
  };

  return (
    <>
      <div className="flex flex-col space-y-4">
        <div className="mb-3">
          <Slider carousel={carousel} showCaption={false} indicators={false}/>
        </div>

        <ProgressBar target={targetStampCount} current={stampCount}/>

        <Button.Group>
          <ScratchCardButton/>
          <QRCodeButton/>
        </Button.Group>

        <ScratchCardModal/>
        <QRCodeModal/>

        {showConfetti && (
          <StarShapedConfetti/>
        )}

        {wallet ? <WalletBalance balance={currentBalance} onAddMoney={addMoney}/> : ''}
      </div>
    </>
  );
};
