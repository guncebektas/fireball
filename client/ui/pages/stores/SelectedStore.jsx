import React from 'react';
import {useTranslator} from "../../providers/i18n";
import {CartButton} from "../../components/buttons/CartButton";
import {useStoreStore} from "../../stores/useStoreStore";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartShopping, faTimes} from "@fortawesome/free-solid-svg-icons";
import {Button} from "flowbite-react";

export const SelectedStore = () => {
  const t = useTranslator();

  const {logo} = Meteor.settings.public.app;

  const {selectedStore, setSelectedStore} = useStoreStore()
  if (!selectedStore) return null;

  function cancelSelectedStore() {
    setSelectedStore(null);
  }

  return (
    <div key="selected-store" className="relative m-border rounded-lg p-4 shadow-md flex items-start space-x-4 mb-1">
      <div className="w-10">
        <img src={logo} alt={selectedStore.name} className="w-full"/>
      </div>
      <div className="w-40">
        <h1 className="m-title text-xl font-semibold">{selectedStore.name}</h1>
        <h5 className="text-gray-500">{t('Selected store')}</h5>
      </div>
      <div className="w-50">
        <CartButton showLabel={true}/>
      </div>

      <button
        onClick={() => cancelSelectedStore()}
        className="absolute right-2 p-4 text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 group"
      >
        <FontAwesomeIcon icon={faTimes}/>
      </button>
    </div>
  );
};
