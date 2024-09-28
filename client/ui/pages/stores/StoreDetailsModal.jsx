import React from 'react';
import {Modal, Button} from 'flowbite-react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMapMarkerAlt, faPhone} from '@fortawesome/free-solid-svg-icons';
import {useTranslator} from "../../providers/i18n";

export const StoreDetailsModal = ({store, isOpen, onClose}) => {
  const t = useTranslator();

  if (!store) return null;

  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>{store.title}</Modal.Header>
      <Modal.Body>
        <p className="text-gray-500">{store.info}</p>
        <div className="mt-4">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="text-blue-500 mr-2"/>
          <span className="text-gray-500">{store.address}</span>
        </div>
        <div className="mt-2">
          <FontAwesomeIcon icon={faPhone} className="text-blue-500 mr-2"/>
          <span className="text-gray-500">{store.phone}</span>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button color="gray" onClick={onClose}>{t('Close')}</Button>
      </Modal.Footer>
    </Modal>
  );
};
