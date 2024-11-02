import React, {useEffect, useState} from 'react';
import Map from '../../components/map/Map';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMapMarkerAlt, faPhone} from '@fortawesome/free-solid-svg-icons';
import {Button} from 'flowbite-react';
import {useTranslator} from "../../providers/i18n";
import {StoreDetailsModal} from "./StoreDetailsModal";
import {StoreMenuModal} from "./StoreMenuModal";
import {Link} from "react-router-dom";
import {H2} from "../../components/heading/Headings";
import {useStoreStore} from "../../stores/useStoreStore";
import {Log} from "meteor/logging";
import {storesMethods} from "../../../../imports/modules/app/stores/stores.methods";
import {FaShoppingCart} from "react-icons/fa";

export const Stores = () => {
  const t = useTranslator();

  const {links} = Meteor.settings.public.app;

  const {stores, setStores, selectedStore, setSelectedStore} = useStoreStore();

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const stores = await storesMethods.getFranchiseMembers();
        return stores.data;
      } catch (err) {
        Log.error(err);
      }
    };

    fetchMembers()
      .then(response => {
        console.log(response);
        setStores(response)
      })
      .catch(error => {
        console.error("Error fetching customer data:", error);
      });
  }, []);

  /** region modals */
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [openMenuModal, setOpenMenuModal] = useState(false);

  const handleOpenDetailsModal = (store) => {
    console.log(store);

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
        <Link to={links.ecommerce} target="_blank">
          <div key="ecommerce" className="m-border rounded-lg p-4 shadow-md flex items-start space-x-4">
            <div className="w-20">
              <h1 className="m-title max-w-md">
                <FaShoppingCart/>
              </h1>
            </div>
            <div className="w-90">
              <h1 className="m-title text-xl font-semibold">{t('Click for e-commerce site')}!</h1>
              <h5 className="text-gray-500">{t('Check our e-commerce now')}.</h5>
            </div>
          </div>
        </Link>

        {stores?.map(store => (
          <div key={store._id} className="m-border rounded-lg p-4 shadow-md flex items-start space-x-4">
            <div className="w-full">
              <h3 className="m-title text-xl font-semibold mb-4">{store.name}</h3>

              <div className="mb-2">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-blue-500 mr-2"/>
                <span className={"text-gray-500"}>{store.street} {store.city}/{store.country}</span>
              </div>
              <div className="mb-2">
                <FontAwesomeIcon icon={faPhone} className="text-blue-500 mr-2"/>
                <span className={"text-gray-500"}>{store.phone}</span>
              </div>

              <div className="flex">
                <Button color={"blue"} onClick={() => handleOpenDetailsModal(store)} className="mr-1">{t('More')}</Button>
                <Button color={"blue"} onClick={() => handleOpenMenuModal(store)}>{t('Menu')}</Button>
              </div>
            </div>

            {/* Map Component */}
            <div className="sm:w-1/3 w-full h-48 rounded-lg overflow-hidden border">
              {store.location?.latitude !== undefined && store.location?.longitude !== undefined && (
                <Map markers={[{title: store.title, latitude: store.location.latitude, longitude: store.location.longitude}]} zoomControls={false}/>
              )}
            </div>
          </div>
        ))}
      </div>

      <StoreDetailsModal store={selectedStore} isOpen={openDetailsModal} onClose={() => setOpenDetailsModal(false)}/>
      <StoreMenuModal store={selectedStore} isOpen={openMenuModal} onClose={() => setOpenMenuModal(false)}/>
    </>
  );
};
