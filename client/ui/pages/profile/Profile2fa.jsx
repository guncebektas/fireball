import React, {useEffect, useState} from 'react';
import {Button, Label, TextInput} from "flowbite-react";
import {H2} from "../../components/heading/Headings.jsx";
import {Meteor} from "meteor/meteor";
import {Buffer} from "buffer";

export const Profile2fa = () => {
  const [enabled2fa, setEnabled2fa] = useState(false);
  const [qrCode, setQrCode] = useState(null);
  const [formData, setFormData] = useState({
    code: ''
  });

  const appName = Meteor.settings.public["appName"];

  const generate2faActivationQrCode = () => {
    Accounts.generate2faActivationQrCode(appName, (err, result) => {
      if (err) {
        console.error(err);

        if (err.error === '2fa-activated') {
          setEnabled2fa(true);
        }

        return;
      }

      const {svg, secret, uri} = result;
      setQrCode(Buffer.from(svg).toString('base64'));
    })
  };
  const enable2fa = async (e) => {
    e.preventDefault();

    Accounts.enableUser2fa(formData.code, (err, response) => {
      if (err) {
        console.error(err);
      }

      setEnabled2fa(true);
    });
  }

  const disable2fa = async (e) => {
    e.preventDefault();

    Accounts.disableUser2fa((err, response) => {
      if (err) {
        console.error(err);
        return;
      }

      setEnabled2fa(false);
    });
  }

  useEffect(() => {
    generate2faActivationQrCode();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div className="px-4 py-5 sm:p-6">
      {enabled2fa ? (
        <>
          <H2 text="2FA Enabled"/>
          <p>Your account is using 2FA</p>
          <Button
            onClick={disable2fa}
            type="button"
            className="flex justify-center py-1 px-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Disable
          </Button>
        </>
      ) : (
        <>
          <H2 text="Secure with 2FA"/>
          <p>Scan the code to enable 2FA</p>
          <div className="flex max-w-md flex-col gap-4">
            <img
              className="px-0"
              width="200"
              src={`data:image/svg+xml;base64,${qrCode}`}
              alt="QR Code"
            />
          </div>
          <div className="block mb-4">
            <Button
              onClick={generate2faActivationQrCode}
              type="button"
              className="flex justify-center border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-600 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Generate a new code
            </Button>
          </div>

          <div className="grid grid-flow-col justify-stretch space-x-4">
            <form className="flex max-w-md flex-col gap-4" onSubmit={enable2fa}>
              <div className="mb-2">
                <div className="mb-2 block">
                  <Label htmlFor="code" value="Code"/>
                  <TextInput id="code" type="number" onChange={handleInputChange}/>
                </div>
              </div>
              <div className="mb-2">
                <div className="mb-2 block">
                  <Button
                    type="submit"
                    className="w-full flex justify-center py-1 px-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};
