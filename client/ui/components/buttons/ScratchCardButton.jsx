import React from 'react';
import {Button} from 'flowbite-react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTicket} from "@fortawesome/free-solid-svg-icons";
import {useScratchCardStore} from "../../stores/useScratchCardStore";
import {useTranslator} from "../../providers/i18n";

export const ScratchCardButton = () => {
  const openScratchCardModal = useScratchCardStore((state) => state.openScratchCardModal);
  const t = useTranslator();

  return (
    <Button color="purple" onClick={openScratchCardModal} className="mr-3">
      <FontAwesomeIcon icon={faTicket} /> {t('Scratch to win')}
    </Button>
  );
};
