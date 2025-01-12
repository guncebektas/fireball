import React from 'react';
import { Button, Modal } from 'flowbite-react';
import { Meteor } from 'meteor/meteor';
import Countdown from '../../countDown/CountDown';
import { useTranslator } from '../../../providers/i18n';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotate } from '@fortawesome/free-solid-svg-icons';
import { useQRCodeStore } from '../../../stores/useQRCodeStore';
import QRCodeDisplay from './QRCodeDisplay';
import { useOtp } from './useOtp';

export const QRCodeModal = () => {
  const t = useTranslator();
  const { icon } = Meteor.settings.public.app;

  const isQRCodeModalOpen = useQRCodeStore((state) => state.isQRCodeModalOpen);
  const closeQRCodeModal = useQRCodeStore((state) => state.closeQRCodeModal);
  const resetCountdown = useQRCodeStore((state) => state.resetCountdown);

  const { otp, timer, handleExpire } = useOtp(isQRCodeModalOpen, resetCountdown);

  return (
    <Modal show={isQRCodeModalOpen} onClose={closeQRCodeModal} size="md">
      <Modal.Header>{t('Your qr code')}</Modal.Header>
      <Modal.Body>
        <QRCodeDisplay otp={otp} icon={icon}/>
        <Countdown onExpire={handleExpire}/>
      </Modal.Body>
      <Modal.Footer>
        <div className="flex justify-between w-full">
          <Button color="default" onClick={closeQRCodeModal}>
            {t('Close')}
          </Button>
          <Button color="primary" onClick={handleExpire} disabled={timer > 0}>
            <FontAwesomeIcon icon={faRotate} className="mr-2" />
            {timer > 0 ? `${t('Reload')} (${timer})` : t('Reload')}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
