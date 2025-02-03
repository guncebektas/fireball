import {Button} from 'flowbite-react';
import {Log} from "meteor/logging";
import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {franchisesMethod} from "../../../../imports/modules/app/stores/franchisesMethod";
import {H2} from "../../components/heading/Headings";
import {Icon} from "../../components/icon/Icon";
import Map from '../../components/map/Map';
import {useTranslator} from "../../providers/i18n";
import {useStoreStore} from "../../stores/useStoreStore";
import {SelectedStore} from "./SelectedStore";
import {StoreDetailsModal} from "./StoreDetailsModal";
import {StoreMenuModal} from "./StoreMenuModal";

export const Stores = () => {
  const t = useTranslator();

  const {links} = Meteor.settings.public.app;

  const {stores, setStores, selectedStore, setSelectedStore} = useStoreStore();

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        return franchisesMethod.getMembers();
      } catch (error) {
        Log.error(error);
      }
    };

    fetchMembers()
      .then(response => {
        const sortedStores = response.data.sort((a, b) =>
          a.name.localeCompare(b.name, 'tr', {sensitivity: 'base'})
        );

        setStores(sortedStores)
      })
      .catch(error => {
        console.error("Error fetching customer data:", error);
      });
  }, []);

  /** region modals */
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [openMenuModal, setOpenMenuModal] = useState(false);

  const handleOpenDetailsModal = (store) => {
    setOpenDetailsModal(true);
    setSelectedStore(store);
  };

  const handleOpenMenuModal = (store) => {
    setOpenMenuModal(true);
    setSelectedStore(store);
  };
  /** endregion */

  return (
    <>
      <H2 text="Stores"/>

      <div className="mt-6 space-y-6">
        <SelectedStore/>

        {links.ecommerce ?
          <Link to={links.ecommerce} target="_blank">
            <div key="ecommerce" className="m-border rounded-lg p-4 shadow-md flex items-start space-x-4">
              <div className="w-10">
                <h1 className="m-title max-w-md">
                  <Icon icon="shopping-cart" className="text-4xl"/>
                </h1>
              </div>
              <div className="w-90">
                <h1 className="m-title text-xl font-semibold">{t('Click for e-commerce site')}!</h1>
                <h5 className="text-gray-500">{t('Check our e-commerce now')}.</h5>
              </div>
            </div>
          </Link> : ''
        }

        {stores && stores?.map(store => (
          <div key={store._id} className="m-border rounded-lg p-4 shadow-md flex items-start space-x-4">
            <div className="w-full">
              <h3 className="m-title text-xl uppercase font-semibold mb-4">{store.name}</h3>

              <div className="mb-2">
                <Icon icon="store" className="text-primary-600 mr-2"/>
                <span className={"text-gray-500"}>{store.street} {store.city}/{store.country}</span>
              </div>
              <div className="mb-2">
                <Icon icon="phone" className="text-primary-600 mr-2"/>
                <span className={"text-gray-500"}>{store.phone}</span>
              </div>

              <div className="flex space-x-2">
                <Button color="secondary" onClick={() => handleOpenDetailsModal(store)} className="flex-1 flex items-center justify-center">
                  <Icon icon="store" className='mr-1'/>
                </Button>
                <Button color="primary" onClick={() => handleOpenMenuModal(store)} className="flex-1 flex items-center justify-center">
                  <Icon icon="utensils" className="mr-1"/>
                  {t('Menu')}
                </Button>
              </div>
            </div>

            {/* Map Component */}
            {store.location?.latitude !== undefined && store.location?.longitude !== undefined && (
              <div className="sm:w-1/3 w-full h-48 m-border rounded-lg overflow-hidden border">
                <Map markers={[{title: store.title, latitude: store.location.latitude, longitude: store.location.longitude}]} zoomControls={false}/>
              </div>
            )}
          </div>
        ))}
      </div>

      <StoreDetailsModal store={selectedStore} isOpen={openDetailsModal} onClose={() => setOpenDetailsModal(false)}/>
      <StoreMenuModal store={selectedStore} isOpen={openMenuModal} onClose={() => setOpenMenuModal(false)}/>
    </>
  );
};
