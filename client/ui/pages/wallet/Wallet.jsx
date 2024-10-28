import React, {useEffect, useState} from 'react';
import {useTranslator} from "../../providers/i18n";
import {Button, Modal} from 'flowbite-react';
import {H4, H5} from "../../components/heading/Headings";
import {Slider} from "../../components/slider/Slider";
import {useTracker} from "meteor/react-meteor-data";
import {Meteor} from "meteor/meteor";
import {USER_PROFILE_PUBLICATION} from "../../../../imports/modules/app/user/userProfiles/enums/publication";
import {userProfileRepository} from "../../../../imports/modules/app/user/userProfiles/userProfileRepository";
import {WalletIcon} from "./WalletIcon";
import ScratchCardModal from "../../components/modals/ScratchCardModal";
import {userWalletMethods} from "../../../../imports/modules/app/user/userWallet/userWallet.methods";
import {ToastSuccess, ToastWarning} from "../../components/alert/Toast";
import {QRCodeModal} from "../../components/modals/QRCodeModal";
import {useQRCodeStore} from "../../stores/useQRCodeStore";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faQrcode, faTicket} from "@fortawesome/free-solid-svg-icons";
import {useScratchCardStore} from "../../stores/useScratchCardStore";
import {Faqs} from "../help/Faqs";
import {Log} from "meteor/logging";

const ProgressBar = ({target, current = 0}) => {
  const t = useTranslator();

  const [modalOpen, setModalOpen] = useState(false);

  let progressPercentage = (current % target / target) * 100;
  if (progressPercentage > 100) {
    progressPercentage = 100;
  }

  const reward = Math.floor(current / target);

  return (
    <div className="mb-3">
      <div className="flex items-center space-x-4">
        <H5 text={t(`Earn one coffee with {$target} stars`, {target: target})}/>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <span className="m-text font-bold">{current % target}/{target}</span>
        </div>

        <div className="relative w-full h-4 bg-gray-200 dark:bg-gray-700 rounded">
          <div
            className="absolute h-full bg-green-700 rounded"
            style={{width: `${progressPercentage}%`}}
          />
        </div>

        <div className="flex items-center ml-2">
          <WalletIcon/>
          <div className="w-6 h-6 flex items-center justify-center rounded-full bg-green-700 mr-1">
            <span className="text-white text-sm font-bold">{reward}</span>
          </div>
          <span className="m-text text-xs ml-1">{t('Free')}</span>
        </div>
        <button
          className="text-blue-500 hover:underline"
          onClick={() => setModalOpen(true)}
        >
          {t('Details')}
        </button>

        <Modal show={modalOpen} onClose={() => setModalOpen(false)}>
          <Modal.Header>{t('FAQs')}</Modal.Header>
          <Modal.Body>
            <Faqs showTitle={false}/>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setModalOpen(false)} color="gray">
              {t('Close')}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

const WalletBalance = ({balance = 0, onAddMoney}) => {
  const t = useTranslator();

  const currency = 'TRY';
  const currencyPosition = 'after';

  const amounts = [20, 50, 100, 200, 250, 500];

  // Function to format the amount based on currency position
  const formatCurrency = (amount) => {
    return currencyPosition === 'before' ? `${currency} ${amount}` : `${amount} ${currency}`;
  };

  return (
    <div className="w-full">
      <H4 text={`${t('Wallet')}: ${formatCurrency(balance.toFixed(2))}`}/>

      <div className="mt-2 grid grid-cols-3 gap-2"> {/* Change to grid layout */}
        {amounts.map((amount) => (
          <Button
            color="blue"
            key={amount}
            onClick={() => onAddMoney(amount)}
          >
            {formatCurrency(amount)}
          </Button>
        ))}
      </div>
    </div>
  );
};

export const Wallet = () => {
  const openScratchCardModal = useScratchCardStore((state) => state.openScratchCardModal);
  const openQRCodeModal = useQRCodeStore((state) => state.openQRCodeModal);
  const t = useTranslator();

  const {carousel} = Meteor.settings.public.pages.aboutUs;
  const wallet = false;

  const [currentStamp, setCurrentStamp] = useState(0);
  const [currentBalance, setBalance] = useState(0);

  const user = useTracker(() => Meteor.user(), []);

  useTracker(() => {
    const subscription = Meteor.subscribe(USER_PROFILE_PUBLICATION.ME);
    if (subscription.ready()) {
      const userProfile = userProfileRepository.findOne({_id: Meteor.userId()}) || {};
      setCurrentStamp(userProfile.stamp);
      setBalance(userProfile.balance);
    }
  }, [user])

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await userWalletMethods.getCustomer();
      } catch (err) {
        Log.error(err);
      }
    };

    fetchCustomer().then(response => console.log(response));
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

        <ProgressBar target={10} current={currentStamp}/>

        <Button.Group>
          <Button color="purple" onClick={openScratchCardModal} className="mr-3">
            <FontAwesomeIcon icon={faTicket}/> {t('Scratch to win')}
          </Button>
          <Button color="blue" onClick={openQRCodeModal}>
            <FontAwesomeIcon icon={faQrcode}/> {t('Your qr code')}
          </Button>
        </Button.Group>

        <ScratchCardModal/>
        <QRCodeModal/>

        {wallet ? <WalletBalance balance={currentBalance} onAddMoney={addMoney}/> : ''}
      </div>
    </>
  );
};
