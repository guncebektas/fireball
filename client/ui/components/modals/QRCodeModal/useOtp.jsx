import { useState, useEffect } from 'react';
import { userProfilesMethods } from '../../../../../imports/modules/app/user/userProfiles/userProfileMethod';

export const useOtp = (isQRCodeModalOpen, resetCountdown) => {
  const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();
  const [otp, setOtp] = useState(generateOTP);
  const [timer, setTimer] = useState(0);

  const saveOtp = (newOtp) => {
    userProfilesMethods.saveOtp({ otp: newOtp });
  };

  useEffect(() => {
    if (isQRCodeModalOpen) {
      saveOtp(otp);
      resetCountdown();
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
    resetCountdown();
    setTimer(10);
  };

  return { otp, timer, handleExpire };
};
