import React, { useEffect } from 'react';
import { useQRCodeStore } from '../../stores/useQRCodeStore';
import { useTranslator } from '../../providers/i18n';

const Countdown = ({ onExpire }) => {
  const t = useTranslator();
  const secondsLeft = useQRCodeStore((state) => state.secondsLeft);
  const decrementCountdown = useQRCodeStore((state) => state.decrementCountdown);
  const resetCountdown = useQRCodeStore((state) => state.resetCountdown);

  useEffect(() => {
    const interval = setInterval(() => {
      if (secondsLeft > 1) {
        decrementCountdown();
      } else {
        onExpire();
        resetCountdown(); // Reset countdown when expired
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft, decrementCountdown, resetCountdown, onExpire]);

  return (
    <div className="flex justify-center">
      <p className="text-sm text-gray-500">
        {t('QR code will refresh in {$secondsLeft} seconds', { secondsLeft })}
      </p>
    </div>
  );
};

export default Countdown;
