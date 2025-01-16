import { Button } from 'flowbite-react';
import React from 'react';
import { useTranslator } from "../../providers/i18n";
import { useScratchCardStore } from "../../stores/useScratchCardStore";
import { Icon } from "../icon/Icon";
export const ScratchCardButton = () => {
  const openScratchCardModal = useScratchCardStore((state) => state.openScratchCardModal);
  const t = useTranslator();

  return (
    <Button color="secondary" onClick={openScratchCardModal} className="uppercase mr-1">
      <Icon icon='ticket' />
      {t('Scratch to win')}
    </Button>
  );
};
