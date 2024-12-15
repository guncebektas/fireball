import React from 'react';
import {QRCodeCanvas} from 'qrcode.react';

const QRCodeDisplay = ({otp, icon}) => (
  <>
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
  </>
);

export default QRCodeDisplay;
