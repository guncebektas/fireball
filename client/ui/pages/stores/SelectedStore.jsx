import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from 'react';
import {CartButton} from "../../components/buttons/CartButton";
import {useTranslator} from "../../providers/i18n";
import {useStoreStore} from "../../stores/useStoreStore";

export const SelectedStore = ({showIcon = true}) => {
  const t = useTranslator();

  const {icon} = Meteor.settings.public.app;

  const {selectedStore, setSelectedStore, openMenuModal} = useStoreStore()

  function cancelSelectedStore() {
    setSelectedStore(null);
  }

  if (!selectedStore) return null;

  return (
    <div key="selected-store" className="relative bg-white dark:bg-gray-900 m-border rounded-lg p-4 shadow-md flex flex-col mb-1">
      <div className="flex items-start space-x-4" onClick={openMenuModal}>
        {showIcon ? (
          <div className="w-10 flex items-center">
            <img src={icon} alt={selectedStore.name} className="w-full pt-2"/>
          </div>
        ) : null}

        <div className="flex-1">
          <p className="text-xs text-gray-500">{t('Selected store')}</p>
          <h1 className="m-title text-xl font-semibold">{selectedStore.name}</h1>
        </div>

        <div>
          <CartButton showLabel={false}/>
        </div>

        <button
          onClick={() => cancelSelectedStore()}
          className="p-3 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group m-text"
        >
          <FontAwesomeIcon icon={faTimes}/>
        </button>
      </div>
    </div>
  );
};
