import { faFacebook, faInstagram, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { Button, Modal } from 'flowbite-react';
import React from 'react';
import { SocialMediaIcons } from "../../components/buttons/SocialMediaIcons";
import { Icon } from "../../components/icon/Icon";
import { useTranslator } from "../../providers/i18n";

export const StoreDetailsModal = ({store, isOpen, onClose}) => {
  const t = useTranslator();

  if (!store) return null;

  return (
    <Modal dismissible show={isOpen} onClose={onClose}>
      <Modal.Header>{store.name}</Modal.Header>
      <Modal.Body>
        <p className="text-gray-500 mb-2">{store.description}</p>

        <div className="mb-2">
          <Icon icon="store" className="text-primary-600 mr-2"/>
          <span className={"text-gray-500"}>{store.street} {store.city}/{store.country}</span>
        </div>
        <div className="mb-2">
          <Icon icon="phone" className="text-primary-600 mr-2"/>
          <span className={"text-gray-500"}><a href={`tel:${store?.phone || store?.commercial?.authorizedPhone}`}>{store?.phone || store?.commercial?.authorizedPhone}</a></span>
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
