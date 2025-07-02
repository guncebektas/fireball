import React, {useEffect, useState} from 'react';
import {useTranslator} from "../../../providers/i18n";
import {Modal} from "flowbite-react";
import {useStoreStore} from "../../../stores/useStoreStore";
import {storesMethod} from "../../../../../imports/modules/app/stores/storesMethod";
import {Log} from "meteor/logging";
import {CartButton} from "../../buttons/CartButton";
import {StoreMenuModalProduct} from "./StoreMenuModalProduct";

export const StoreMenuModal = () => {
  const t = useTranslator();
  const {
    selectedStore,
    selectedStoreProductCategories,
    setSelectedStoreProductCategories,
    selectedStoreProducts,
    setSelectedStoreProducts,
    isMenuModalOpen,
    closeMenuModal,
  } = useStoreStore();

  const [activeTab, setActiveTab] = useState(null);

  useEffect(() => {
    if (!selectedStore) return;

    const fetchProductCategories = async () => {
      try {
        const {_id} = Meteor.settings.public.app;
        const storeId = _id || selectedStore.franchiseId || selectedStore._id;

        const categories = await storesMethod.getProductCategories({_id: storeId});
        const filteredCategories = categories.data.filter(category => category.isVisible && category.isVisibleInQrMenu);

        setSelectedStoreProductCategories(filteredCategories);
        if (filteredCategories.length > 0) {
          setActiveTab(filteredCategories[0]._id);  // Set first category as default tab
        }
      } catch (error) {
        Log.error(error);
      }
    };

    const fetchProducts = async () => {
      try {
        const products = await storesMethod.getProducts({_id: selectedStore._id});
        setSelectedStoreProducts(products.data);
      } catch (error) {
        Log.error(error);
      }
    };

    fetchProductCategories();
    fetchProducts();
  }, [selectedStore, setSelectedStoreProductCategories, setSelectedStoreProducts]);

  const productMap = Object.fromEntries(selectedStoreProducts.map(p => [p.franchiseProductId, p]));
  console.log('productMap');
  console.log(productMap);

  // Filter out categories with no products
  const categoriesWithProducts = selectedStoreProductCategories.filter(category =>
    selectedStoreProducts.some(product => product.categoryId === category._id)
  );

  // Filter products by the active category
  const filteredProducts = selectedStoreProducts.filter(
    product => product.categoryId === activeTab
  );

  const expandedProducts = filteredProducts.flatMap(product => {
    if (product.variation && product.variation.length > 0) {
      // Tekilleştir
      const uniqueVariation = Array.from(
        new Map(product.variation.map(v => [v.productId, v])).values()
      );
      return uniqueVariation
        .map(v => productMap[v.productId])
        .filter(Boolean);
    }
    return [product];
  });
  console.log('expandedProducts');
  console.log(expandedProducts);

  const handleTabChange = (categoryId) => {
    setActiveTab(categoryId);
  };

  // Early return if no store is selected
  if (!selectedStore || !isMenuModalOpen) return null;

  return (
    <Modal dismissible show={isMenuModalOpen} onClose={closeMenuModal}>
      <Modal.Header>
        {selectedStore.name}
      </Modal.Header>
      <Modal.Body className="m-modal-body">
        <div className="absolute top-4 right-16 z-10">
          <CartButton showLabel={true}/>
        </div>

        <div className="gap-3 mx-auto max-w-screen-xl dark:text-white relative">
          <div className="overflow-x-auto relative">
            <ul id="tab-list" className="flex border-b space-x-4 w-full min-w-max mobile-glimpse">
              {categoriesWithProducts.map(category => (
                <li key={category._id} data-test-id={category._id} className="cursor-pointer">
                  <button
                    className={`uppercase py-2 px-4 ${activeTab === category._id ? 'border-b-2 border-primary-600' : ''}`}
                    onClick={() => handleTabChange(category._id)}
                  >
                    {t(category.title)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Tab Content */}
          <div className="mt-4">
            <StoreMenuModalProduct products={expandedProducts}/>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
