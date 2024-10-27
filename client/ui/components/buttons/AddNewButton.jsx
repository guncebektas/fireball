import React from "react";
import { Button } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useTranslator } from "../../providers/i18n";

export const AddNewButton = ({ onClick }) => {
  const t = useTranslator();

  return (
    <div className="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:flex sm:items-center">
      <Button gradientMonochrome="purple" size="sm" onClick={onClick}>
        <FontAwesomeIcon icon={faPlus} className="mr-2" />
        {t('Add')}
      </Button>
    </div>
  );
};
