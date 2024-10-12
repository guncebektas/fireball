import React from 'react';
import {Button, Modal} from 'flowbite-react';
import {useTranslator} from "../../providers/i18n";

export const ChangePasswordModal = ({userId, isOpen, onClose}) => {
  const t = useTranslator();

  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>{userId}</Modal.Header>
      <Modal.Body>

      </Modal.Body>
      <Modal.Footer>
        <Button color="gray" onClick={onClose}>{t('Close')}</Button>
      </Modal.Footer>
    </Modal>
  );
};
