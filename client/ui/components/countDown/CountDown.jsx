import React, { useEffect, useState } from 'react';
import {useTranslator} from "../../providers/i18n";

const Countdown = ({ initialSeconds, onExpire }) => {
  const t = useTranslator();
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prevSeconds) => {
        if (prevSeconds === 1) {
          onExpire(); // Call the parent function to generate a new OTP
          return initialSeconds; // Reset the countdown
        }
        return prevSeconds - 1;
      });
    }, 1000); // Decrease seconds every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, [initialSeconds, onExpire]);

  return (
    <div className="flex justify-center">
      <p className="text-sm text-gray-500">{t('QR code will refresh in {$secondsLeft} seconds', {secondsLeft: secondsLeft})}</p>
    </div>
  );
};

export default Countdown;
