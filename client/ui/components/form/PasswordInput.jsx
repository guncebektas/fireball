import React, {forwardRef, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Button, TextInput } from 'flowbite-react';
import {useTranslator} from "../../providers/i18n";

const PasswordInput = forwardRef((props, ref) => {
  const t = useTranslator();

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="relative w-full">
      <TextInput
        type={passwordVisible ? 'text' : 'password'}
        placeholder={t('Type your password')}
        className="w-full"
        ref={ref}
        {...props}
      />
      <Button
        className="absolute inset-y-0 right-0 flex items-center px-2"
        onClick={togglePasswordVisibility}
      >
        <FontAwesomeIcon
          icon={passwordVisible ? faEyeSlash : faEye}
          className="h-5 w-5 text-gray-500"
        />
      </Button>
    </div>
  );
});

export default PasswordInput;
