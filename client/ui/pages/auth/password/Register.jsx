import React, {useRef, useState} from 'react';
import {Button, FloatingLabel, Modal, ToggleSwitch} from 'flowbite-react';
import {STATE_AUTH_PASSWORD_FORM} from "./enums/state.js";
import {Accounts} from "meteor/accounts-base";
import {Alert} from "../../../components/alert/Alert";
import {useTranslator} from "../../../providers/i18n";
import {H4} from "../../../components/heading/Headings";
import {Log} from "meteor/logging";
import {TermsAndConditions} from "../legal/TermsAndConditions";
import {PrivacyPolicy} from "../legal/PrivacyPolicy";
import FloatingPasswordInput from "../../../components/form/FloatingPasswordInput";

export const Register = ({onStateChange}) => {
  const t = useTranslator();

  const {isUsernameLoginEnabled, isRegistrationEnabled} = Meteor.settings.public;
  const [openAlert, setOpenAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [gdprAccepted, setGdprAccepted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({title: '', content: ''});

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordAgainRef = useRef();

  const handleState = () => {
    onStateChange(STATE_AUTH_PASSWORD_FORM.LOGIN);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setOpenAlert(false);

    if (!termsAccepted || !gdprAccepted) {
      setOpenAlert(true);
      setErrorMessage('You must accept the terms and privacy policy to register');
      return;
    }

    const formData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      passwordAgain: passwordAgainRef.current.value,
    };

    if (formData.password !== formData.passwordAgain) {
      setOpenAlert(true);
      setErrorMessage(`Passwords should be same`);
      return;
    }

    let userObject = {
      password: formData.password,
      passwordAgain: formData.passwordAgain
    }

    if (isUsernameLoginEnabled) {
      userObject = {...{username: formData.email}, ...userObject};
    } else {
      userObject = {...{email: formData.email}, ...userObject};
    }

    await Accounts.createUserAsync(userObject)
      .then(response => {
        window.location.reload();
      })
      .catch(error => {
        Log.error(error);
        setOpenAlert(true);
        setErrorMessage(error.reason);
      });
  };

  const openTermsModal = () => {
    const {title, text} = Meteor.settings.public.pages.termsAndConditions;
    setModalContent({
      title: t(title),
      content: `${t(text)}.`,
      component: TermsAndConditions,
    });
    setModalOpen(true);
  };

  const openPrivacyModal = () => {
    const {title, text} = Meteor.settings.public.pages.privacyPolicy;
    setModalContent({
      title: t(title),
      content: `${t(text)}.`,
      component: PrivacyPolicy
    });
    setModalOpen(true);
  };

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="m-title text-center text-3xl md:text-4xl">
          {t('Register')}
        </h2>

        <div className="bg-white dark:bg-gray-900 py-8 px-4 mt-8 shadow sm:rounded-lg sm:px-10">
          <div>
            {isRegistrationEnabled === false ?
              <>
                <H4 text={`${t('Registration is currently disabled')}!`}/>
              </>
              :
              <>
                <Alert show={openAlert} color="failure" iconName="warning">
                  <span className="font-medium">{t('Error')}:</span> {t(errorMessage)}.
                </Alert>

                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="mb-2">
                    {
                      isUsernameLoginEnabled ?
                        <FloatingLabel variant="standard" label={t('Type your username')} id="email" type="text" ref={emailRef} required/>
                        :
                        <FloatingLabel variant="standard" label={t('Type your email')} id="email" type="email" ref={emailRef} required/>
                    }
                  </div>
                  <div className="mb-2">
                    <FloatingPasswordInput ref={passwordRef} required/>
                  </div>
                  <div className="mb-2">
                    <FloatingPasswordInput ref={passwordAgainRef} required/>
                  </div>

                  <div className="mb-2 flex items-center">
                    <ToggleSwitch
                      checked={termsAccepted}
                      color="success"
                      label={t('I accept the terms and conditions')}
                      onChange={setTermsAccepted}
                    />
                    <Button onClick={openTermsModal} size="xs" color="gray" className="ml-2">
                      {t('Read')}
                    </Button>
                  </div>

                  <div className="mb-2 flex items-center">
                    <ToggleSwitch
                      checked={gdprAccepted}
                      color="success"
                      label={t('I accept the privacy policy')}
                      onChange={setGdprAccepted}
                    />
                    <Button onClick={openPrivacyModal} size="xs" color="gray" className="ml-2">
                      {t('Read')}
                    </Button>
                  </div>

                  <div>
                    <Button type="submit" color="primary">{t('Register')}</Button>
                  </div>

                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    {t('Already have an account')}? <button className="font-medium text-primary-600 hover:underline dark:text-primary-500" onClick={handleState}>{t('Login')}</button>
                  </p>
                </form>
              </>
            }
          </div>
        </div>
      </div>

      {/* Modal for Terms and GDPR */}
      <Modal dismissible show={modalOpen} onClose={() => setModalOpen(false)} size="lg">
        <Modal.Header>{modalContent.title}</Modal.Header>
        <Modal.Body className="m-modal-body">
          <p>{modalContent.text}</p>
          {modalContent.component && <modalContent.component/>}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setModalOpen(false)} color="gray">
            {t('Close')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
