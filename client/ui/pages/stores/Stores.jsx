import {Button} from 'flowbite-react';
import {Log} from "meteor/logging";
import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {franchisesMethod} from "../../../../imports/modules/app/stores/franchisesMethod";
import FloatingInput from '../../components/form/FloatingInput';
import {H2} from "../../components/heading/Headings";
import {Icon} from "../../components/icon/Icon";
import Map from '../../components/map/Map';
import {useTranslator} from "../../providers/i18n";
import {useStoreStore} from "../../stores/useStoreStore";
import {SelectedStore} from "./SelectedStore";
import {StoreDetailsModal} from "./StoreDetailsModal";
import {HtmlUtility} from "../../../shared/utilities/HtmlUtility";

export const Stores = () => {
  const t = useTranslator();

  const {links} = Meteor.settings.public.app;

  const {stores, setStores, selectedStore, setSelectedStore, openMenuModal, closeMenuModal} = useStoreStore();
  const [searchQuery, setSearchQuery] = useState('');

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
        console.error("Error fetching members data:", error);
      });
  }, []);

  /** region modals */
  const [openDetailsModal, setOpenDetailsModal] = useState(false);

  const handleOpenDetailsModal = (store) => {
    setOpenDetailsModal(true);
    setSelectedStore(store);
  };

  const handleOpenMenuModal = (store) => {
    openMenuModal(true);
    setSelectedStore(store);
  };
  /** endregion */

    // Filter stores based on search query
  const filteredStores = stores?.filter(store =>
      store.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <>
      <H2 text="Stores" showBackButton={true}/>

      <div className="my-6 space-y-6">
        <SelectedStore showIcon={true}/>

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

        {/* Search Input */}
        <div className="mb-4">
          <FloatingInput
            id="storeSearch"
            type="text"
            placeholder={`${t('Search stores')}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>

        {filteredStores && filteredStores?.map(store => (
          <div key={store._id} className="m-border rounded-lg p-4 shadow-md flex items-start space-x-4">
            <div className="w-full">
              <h3 className="m-title text-xl uppercase font-semibold mb-4">{store.name}</h3>

              <div className="mb-2">
                <Icon icon="store" className="text-primary-600 mr-2"/>
                <span className={"text-gray-500"}>
                  {HtmlUtility.CapitalizeWordLetters(store.street)}&nbsp;
                  {HtmlUtility.CapitalizeWordLetters(store.city)}/
                  {HtmlUtility.CapitalizeWordLetters(store.country)}
                </span>
              </div>

              <div className="mb-5">
                <Icon icon="phone" className="text-primary-600 mr-2"/>
                <span className={"text-gray-500"}><a href={`tel:${HtmlUtility.PadPhoneNumber(store?.phone || store?.commercial?.authorizedPhone)}`}>{HtmlUtility.PadPhoneNumber(store?.phone || store?.commercial?.authorizedPhone, true)}</a></span>
              </div>

              <div className="flex space-x-2 mb-2">
                <Button color="secondary" onClick={() => handleOpenDetailsModal(store)} className="flex-1 flex items-center justify-center">
                  <Icon icon="store" className='mr-1'/>
                  <span className="inline-flex items-center">{t('Details')}</span>
                </Button>
                <Button color="primary" onClick={() => handleOpenMenuModal(store)} className="flex-1 flex items-center justify-center gap-2">
                  <Icon icon="utensils" className="flex-shrink-0 mr-1"/>
                  <span className="inline-flex items-center">{t('Menu')}</span>
                </Button>
              </div>

              {/* Map Component */}
              {store?.location !== undefined && (
                <div className="w-full h-48 m-border rounded-lg overflow-hidden border">
                  {/* Parse location string from format "latitude,longitude" */}
                  {(() => {
                    const [latitude, longitude] = store.location.split(',').map(coord => parseFloat(coord));
                    return (
                      <Map markers={[{title: store.name, latitude, longitude}]} zoomControls={false}/>
                    );
                  })()}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <StoreDetailsModal store={selectedStore} isOpen={openDetailsModal} onClose={() => setOpenDetailsModal(false)}/>
    </>
  );
};
