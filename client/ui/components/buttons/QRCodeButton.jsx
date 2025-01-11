import React from 'react';
import {Button} from 'flowbite-react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faQrcode} from "@fortawesome/free-solid-svg-icons";
import {useQRCodeStore} from "../../stores/useQRCodeStore";
import {useTranslator} from "../../providers/i18n";

export const QRCodeButton = () => {
  const openQRCodeModal = useQRCodeStore((state) => state.openQRCodeModal);
  const t = useTranslator();

  return (
    <div className="hidden sm:block">
      <Button color="primary" onClick={openQRCodeModal} className="mr-1">
        <FontAwesomeIcon icon={faQrcode}/>
        QR
      </Button>
    </div>
  );
};
