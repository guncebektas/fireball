import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'flowbite-react';
import { QRCodeCanvas } from 'qrcode.react';
import { Meteor } from 'meteor/meteor';
import Countdown from '../countDown/CountDown';
import { userProfilesMethods } from '../../../../imports/modules/app/user/userProfiles/userProfileMethod';
import { useTranslator } from '../../providers/i18n';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotate } from '@fortawesome/free-solid-svg-icons';
import { useQRCodeStore } from '../../stores/useQRCodeStore';

export const QRCodeModal = () => {
  const t = useTranslator();
  const { icon } = Meteor.settings.public.app;

  const isQRCodeModalOpen = useQRCodeStore((state) => state.isQRCodeModalOpen);
  const closeQRCodeModal = useQRCodeStore((state) => state.closeQRCodeModal);
  const resetCountdown = useQRCodeStore((state) => state.resetCountdown);

  // Generate OTP
  const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();
  const [otp, setOtp] = useState(generateOTP);
  const [timer, setTimer] = useState(0);

  const saveOtp = (newOtp) => {
    userProfilesMethods.saveOtp({ otp: newOtp });
  };

  useEffect(() => {
    if (isQRCodeModalOpen) {
      saveOtp(otp);
      resetCountdown(); // Reset countdown each time modal opens
    }
  }, [isQRCodeModalOpen, otp, resetCountdown]);

  useEffect(() => {
    let timerId;
    if (timer > 0) {
      timerId = setTimeout(() => setTimer(timer - 1), 1000);
    }
    return () => clearTimeout(timerId);
  }, [timer]);

  const handleExpire = () => {
    const newOtp = generateOTP();
    setOtp(newOtp);
    saveOtp(newOtp);
    resetCountdown(); // Reset countdown when OTP is refreshed
    setTimer(10); // Start 10 seconds timer
  };

  return (
    <Modal show={isQRCodeModalOpen} onClose={closeQRCodeModal} size="md">
      <Modal.Header>{t('Your qr code')}</Modal.Header>
      <Modal.Body>
        <div className="flex justify-center">
          <QRCodeCanvas
            value={otp}
            size={200}
            imageSettings={{
              src: icon,
              height: 40,
              width: 40,
              excavate: true,
            }}
          />
        </div>
        <div className="flex justify-center">
          <p className="scale-150 font-extrabold text-center py-3">{otp}</p>
        </div>
        <Countdown onExpire={handleExpire} />
      </Modal.Body>
      <Modal.Footer>
        <div className="flex justify-between w-full">
          <Button color="default" onClick={closeQRCodeModal}>
            {t('Close')}
          </Button>
          <Button color="blue" onClick={handleExpire} disabled={timer > 0}>
            <FontAwesomeIcon icon={faRotate} className="mr-2" />
            {timer > 0 ? `${t('Reload')} (${timer})` : t('Reload')}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
