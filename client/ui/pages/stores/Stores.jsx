import React, { useState } from 'react';
import Map from '../../components/map/Map';
import { Title } from "../../components/title/Title";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from 'flowbite-react';

const storesData = [
  {
    id: 1,
    title: "Store 1",
    description: "This is a description of Store 1. We offer a wide range of products and services.",
    info: "This is a description of Store 1. We offer a wide range of products and services.",
    location: { latitude: 40.7128, longitude: -74.0060 },
    phone: "+1 (555) 123-4567",
    address: "123 Main St, New York, NY",
  },
  {
    id: 2,
    title: "Store 2",
    description: "Store 2 specializes in unique handcrafted items and local products.",
    info: "This is a description of Store 2. We offer a wide range of products and services.",
    location: { latitude: 34.0522, longitude: -118.2437 },
    phone: "+1 (555) 987-6543",
    address: "456 Elm St, Los Angeles, CA",
  },
  {
    id: 3,
    title: "Store 3",
    description: "At Store 3, we pride ourselves on providing excellent customer service.",
    info: "This is a description of Store 3. We offer a wide range of products and services.",
    location: { latitude: 41.8781, longitude: -87.6298 },
    phone: "+1 (555) 654-3210",
    address: "789 Pine St, Chicago, IL",
  },
];

export const Stores = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);

  const handleOpenModal = (store) => {
    setSelectedStore(store);
    setOpenModal(true);
  };

  return (
    <>
      <Title text="Stores" centered={true} />

      <div className="space-y-6">
        {storesData.map(store => (
          <div key={store.id} className="border rounded-lg p-4 shadow-md flex items-start space-x-4">
            <div className="w-full">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{store.title}</h3>
              <p className="text-gray-500 mb-4">{store.description}</p>

              <div className="mb-2">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-blue-500 mr-2" />
                <span className={"text-gray-500"}>{store.address}</span>
              </div>
              <div className="mb-4">
                <FontAwesomeIcon icon={faPhone} className="text-blue-500 mr-2" />
                <span className={"text-gray-500"}>{store.phone}</span>
              </div>

              <Button color={"blue"} onClick={() => handleOpenModal(store)}>More Info</Button>
            </div>

            {/* Map Component */}
            <div className="sm:w-1/3 w-full h-48 rounded-lg overflow-hidden border">
              <Map markers={[{ title: store.title, latitude: store.location.latitude, longitude: store.location.longitude }]} zoomControls={false}/>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Component */}
      {selectedStore && (
        <Modal show={openModal} onClose={() => setOpenModal(false)}>
          <Modal.Header>
            {selectedStore.title}
          </Modal.Header>
          <Modal.Body>
            <p>{selectedStore.info}</p>
            <div className="mt-4">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="text-blue-500 mr-2"/>
              <span className={"text-gray-500"}>{selectedStore.address}</span>
            </div>
            <div className="mt-2">
              <FontAwesomeIcon icon={faPhone} className="text-blue-500 mr-2"/>
              <span className={"text-gray-500"}>{selectedStore.phone}</span>
            </div>
          </Modal.Body>
          <Modal.Footer>
          <Button color={"gray"} onClick={() => setOpenModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};
