import { faFacebook, faInstagram, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { Button, Modal } from 'flowbite-react';
import React from 'react';
import { SocialMediaIcons } from "../../components/buttons/SocialMediaIcons";
import { Icon } from "../../components/icon/Icon";
import { useTranslator } from "../../providers/i18n";
import { HtmlUtility } from "../../../shared/utilities/HtmlUtility";

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
          <span className={"text-gray-500"}>
            {HtmlUtility.CapitalizeWordLetters(store.street)}&nbsp;
            {HtmlUtility.CapitalizeWordLetters(store.city)}/
            {HtmlUtility.CapitalizeWordLetters(store.country)}
          </span>
        </div>

        <div className="mb-2">
          <Icon icon="phone" className="text-primary-600 mr-2"/>
          <span className={"text-gray-500"}><a href={`tel:${HtmlUtility.PadPhoneNumber(store?.phone || store?.commercial?.authorizedPhone)}`}>{HtmlUtility.PadPhoneNumber(store?.phone || store?.commercial?.authorizedPhone, true)}</a></span>
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
