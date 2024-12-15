import React from 'react';
import {Modal, Button} from 'flowbite-react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMapMarkerAlt, faPhone} from '@fortawesome/free-solid-svg-icons';
import {useTranslator} from "../../providers/i18n";
import {SocialMediaIcons} from "../../components/buttons/SocialMediaIcons";
import {faFacebook, faInstagram, faXTwitter} from "@fortawesome/free-brands-svg-icons";

export const StoreDetailsModal = ({store, isOpen, onClose}) => {
  const t = useTranslator();

  if (!store) return null;

  return (
    <Modal dismissible show={isOpen} onClose={onClose}>
      <Modal.Header>{store.name}</Modal.Header>
      <Modal.Body>
        <p className="text-gray-500 mb-2">{store.description}</p>

        <div className="mb-2">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="text-blue-500 mr-2"/>
          <span className={"text-gray-500"}>{store.street} {store.city}/{store.country}</span>
        </div>
        <div className="mb-2">
          <FontAwesomeIcon icon={faPhone} className="text-blue-500 mr-2"/>
          <span className={"text-gray-500"}>{store.phone}</span>
        </div>

        <div className="mb-4">
          <SocialMediaIcons links={[
            {icon: faFacebook, url: store.link?.facebook, alt: 'Facebook'},
            {icon: faInstagram, url: store.link?.instagram, alt: 'Instagram'},
            {icon: faXTwitter, url: store.link?.twitter, alt: 'X'}
          ]}/>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button color="default" onClick={onClose}>
          {t('Close')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
