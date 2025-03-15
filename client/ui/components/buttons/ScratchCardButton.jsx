import {Button} from 'flowbite-react';
import React from 'react';
import {useTranslator} from "../../providers/i18n";
import {useScratchCardStore} from "../../stores/useScratchCardStore";
import {Icon} from "../icon/Icon";

export const ScratchCardButton = () => {
  const t = useTranslator();
  const openScratchCardModal = useScratchCardStore((state) => state.openScratchCardModal);
  
  const {showScratchCard} = Meteor.settings.public.app;

  if (!showScratchCard) {
    return null;
  }

  return (
    <Button color="primary" size="lg" onClick={openScratchCardModal}>
      <Icon icon='ticket' className='mr-1'/>
      {t('Scratch to win')}
    </Button>
  );
};
