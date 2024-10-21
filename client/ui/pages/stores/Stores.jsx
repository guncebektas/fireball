import React, {useState} from 'react';
import Map from '../../components/map/Map';
import {Title} from "../../components/title/Title";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMapMarkerAlt, faPhone} from '@fortawesome/free-solid-svg-icons';
import {Button} from 'flowbite-react';
import {useTranslator} from "../../providers/i18n";
import {StoreDetailsModal} from "./StoreDetailsModal";
import {StoreMenuModal} from "./StoreMenuModal";
import {Link} from "react-router-dom"; // Import the new component

const storesData = [{
  id: 1,
  title: "Store 1",
  description: "This is a description of Store 1. We offer a wide range of products and services.",
  info: "This is a description of Store 1. We offer a wide range of products and services.",
  phone: "+1 (555) 123-4567",
  address: "123 Main St, New York, NY",
}, {
  id: 2,
  title: "Store 2",
  description: "Store 2 specializes in unique handcrafted items and local products.",
  info: "This is a description of Store 2. We offer a wide range of products and services.",
  location: {latitude: 34.0522, longitude: -118.2437},
  phone: "+1 (555) 987-6543",
  address: "456 Elm St, Los Angeles, CA",
}, {
  id: 3,
  title: "Store 3",
  description: "At Store 3, we pride ourselves on providing excellent customer service.",
  info: "This is a description of Store 3. We offer a wide range of products and services.",
  location: {latitude: 41.8781, longitude: -87.6298},
  phone: "+1 (555) 654-3210",
  address: "789 Pine St, Chicago, IL",
}];

export const Stores = () => {
  const t = useTranslator();
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [openMenuModal, setOpenMenuModal] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);

  const handleOpenDetailsModal = (store) => {
    setSelectedStore(store);
    setOpenDetailsModal(true);
  };

  const handleOpenMenuModal = (store) => {
    setSelectedStore(store);
    setOpenMenuModal(true);
  };

  const {links} = Meteor.settings.public.app;

  return (
    <>
      <Title text="Stores" centered={true}/>

      <div className="space-y-6">
        <Link to={links.ecommerce} target="_blank">
          <div key="ecommerce" className="m-border rounded-lg p-4 shadow-md flex items-start space-x-4">
            <div className="w-full">
              <h3 className="m-title text-xl font-semibold">{t('Click for e-commerce site')}!</h3>
              <p className="text-gray-500">{t('Check our e-commerce now')}.</p>
            </div>
          </div>
        </Link>

        {storesData.map(store => (
          <div key={store.id} className="m-border rounded-lg p-4 shadow-md flex items-start space-x-4">
            <div className="w-full">
              <h3 className="m-title text-xl font-semibold">{store.title}</h3>
              <p className="text-gray-500 mb-4">{store.description}</p>

              <div className="mb-2">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-blue-500 mr-2"/>
                <span className={"text-gray-500"}>{store.address}</span>
              </div>
              <div className="mb-4">
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
