import React, { useEffect, useState } from 'react';
import { Alert, Button } from 'flowbite-react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import {useTranslator} from "../../providers/i18n";

export const ConnectionAlert = () => {
  const t = useTranslator();

  const [isConnected, setIsConnected] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    let connectionTimer;
    // Tracker autorun runs reactively whenever Meteor.status() changes
    const computation = Tracker.autorun(() => {
      const connected = Meteor.status().connected;
      setIsConnected(connected);
      
      if (!connected) {
        setIsDismissed(false); // Reset dismissal when connection is lost
        // Start a 3-second timer before showing the alert
        connectionTimer = setTimeout(() => {
          setShowAlert(true);
        }, 3000);
      } else {
        setShowAlert(false);
        clearTimeout(connectionTimer);
      }
    });

    // Clean up the Tracker computation and timer when the component unmounts
    return () => {
      computation.stop();
      clearTimeout(connectionTimer);
    };
  }, []);

  useEffect(() => {
    let timer;
    if (!isConnected && !isDismissed && showAlert) {
      // Auto-dismiss after 10 seconds
      timer = setTimeout(() => {
        setIsDismissed(true);
      }, 10000);
    }
    return () => clearTimeout(timer);
  }, [isConnected, isDismissed, showAlert]);

  // Handler for reconnecting manually
  const handleReconnect = () => {
    Meteor.reconnect();
  };

  // Handler for manually dismissing the alert
  const handleDismiss = () => {
    setIsDismissed(true);
    // Set a timer to re-show the alert after 10 seconds
    setTimeout(() => {
      setIsDismissed(false);
    }, 10000);
  };

  // Don't show the alert if it's dismissed, the connection is active, or we're still in the delay period
  if (isConnected || isDismissed || !showAlert) {
    return null;
  }

  return (
    <div className="absolute top-0 left-0 w-full z-100 flex justify-center">
      <Alert color="red" className="w-full">
        <div className="max-w-3xl">
          <div className="flex justify-between items-center">
            <FontAwesomeIcon icon={faExclamationTriangle} />
            <strong className="mr-1">{t('Connection lost')}!</strong>
            <Button color="light" onClick={handleReconnect}>
              {t('Connect')}
            </Button>
            <Button color="light" onClick={handleDismiss}>
              {t('Dismiss')}
            </Button>
          </div>
        </div>
      </Alert>
    </div>
  );
};
