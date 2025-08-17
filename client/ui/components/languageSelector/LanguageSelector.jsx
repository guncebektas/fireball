import React from "react";
import {Button, Modal, Navbar} from "flowbite-react";
import {useTranslator} from "../../providers/i18n";
import {onChangeLocale} from "../../../../imports/modules/shared/functions/onChangeLocale";
import i18n from "meteor/universe:i18n";

export const LanguageSelector = (onlyIcon = false) => {
  const t = useTranslator();

  const currentLanguage = i18n.getLocale();
  const {supportedLanguages} = Meteor.settings.public.app;

  const label = onlyIcon ? (<img src={`/online/images/flags/${currentLanguage}.svg`} alt={t("Language")} className="w-5 mr-1"/>) : (t("Language"));

  return (
    <>
      <Navbar.Link href="#" onClick={setModalOpen(true)}>
        {label}
      </Navbar.Link>
      <Modal dismissible show={modalOpen} onClose={() => setModalOpen(false)} size="lg">
        <Modal.Header>{t('Language')}</Modal.Header>
        <Modal.Body className="m-modal-body">
          <ul>
            {supportedLanguages.map(({languageCode, languageLabel}) => (
              <li key={languageCode} onClick={() => onChangeLocale(languageCode)}>
                <img src={`/online/images/flags/${languageCode}.svg`} alt={languageLabel} className="w-5 mr-1"/>
                {languageLabel}
              </li>
            ))}
          </ul>
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
