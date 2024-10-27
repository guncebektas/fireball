import React, {useState} from 'react';
import {Button, Modal} from 'flowbite-react';
import {QRCodeCanvas} from 'qrcode.react';
import {Meteor} from 'meteor/meteor';
import Countdown from "../countDown/CountDown";
import {userProfilesMethods} from "../../../../imports/modules/app/user/userProfiles/userProfile.methods";
import {useTranslator} from "../../providers/i18n";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRotate} from "@fortawesome/free-solid-svg-icons";

export const QRCodeModal = ({ isOpen, onClose }) => {
  const t = useTranslator();

  const [otp, setOtp] = useState(generateOTP());
  userProfilesMethods.saveOtp({otp})

  function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  const handleExpire = () => {
    setOtp(generateOTP()); // Generate a new OTP when the countdown expires
    userProfilesMethods.saveOtp({otp});
  };

  const {icon} = Meteor.settings.public.app;

  return (
    <Modal show={isOpen} size="md" onClose={onClose}>
      <Modal.Header>{t('Your qr code')}</Modal.Header>
      <Modal.Body>
        <div className="flex justify-center">
          <QRCodeCanvas
            value={otp}
            size={200}
            imageSettings={{
              src: icon, // Path to your logo
              height: 40,   // Adjust the height of the logo
              width: 40,    // Adjust the width of the logo
              excavate: true, // Ensures the QR code doesn't overlap with the image
            }}
          />
        </div>
        <div className="flex justify-center">
          <p className="scale-150 font-extrabold text-center py-3">{otp}</p>
        </div>
        <Countdown initialSeconds={60} onExpire={handleExpire}/>
      </Modal.Body>
      <Modal.Footer>
        <div className="flex justify-between w-full">
          <Button color="default" onClick={onClose}>
            {t('Close')}
          </Button>
          <Button color="blue" onClick={handleExpire}>
            <FontAwesomeIcon icon={faRotate}/>
            {t('Reload')}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
);
};
