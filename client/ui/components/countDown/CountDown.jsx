import React, { useEffect, useState } from 'react';

const Countdown = ({ initialSeconds, onExpire }) => {
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
      <p className="text-sm text-gray-500">QR code will refresh in {secondsLeft} seconds</p>
    </div>
  );
};

export default Countdown;
