import React, {forwardRef, useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import {Button, FloatingLabel} from 'flowbite-react';
import {useTranslator} from "../../providers/i18n";

const FloatingPasswordInput = forwardRef((props, ref) => {
  const t = useTranslator();

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="relative w-full">
      <FloatingLabel
        variant="filled"
        label={t('Type your password')}
        id="email"
        type={passwordVisible ? 'text' : 'password'}
        ref={ref}
        {...props}/>
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

export default FloatingPasswordInput;
