import React from "react";
import {Link} from "react-router-dom";
import {setParam} from "../../../../imports/modules/shared/functions/setParam";
import {Button} from "flowbite-react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {useTranslator} from "../../providers/i18n";

export const AddNewButton = ({route}) => {
  const t = useTranslator();

  return (
    <div className="mt-5 sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:flex sm:items-center">
      <Link to={setParam(route, {key: '_id', value: 'new'})}>
        <Button gradientMonochrome="purple" size="sm">
          <FontAwesomeIcon icon={faPlus}/>
          {t('Add')}
        </Button>
      </Link>
    </div>
  );
};

