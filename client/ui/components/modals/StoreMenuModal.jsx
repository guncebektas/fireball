import React, {useEffect, useState} from 'react';
import {useTranslator} from "../../providers/i18n";
import {Button, Modal} from "flowbite-react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useStoreStore} from "../../stores/useStoreStore";
import {storesMethod} from "../../../../imports/modules/app/stores/storesMethod";
import {Log} from "meteor/logging";
import {WalletIcon} from "../../pages/wallet/WalletIcon";
import CurrencyDisplay from "../currencyDisplay/currencyDiplay";
import {faCartPlus} from "@fortawesome/free-solid-svg-icons/faCartPlus";
import {useCartStore} from "../../stores/useCartStore";
import {CartButton} from "../buttons/CartButton";
import {HtmlUtility} from "../../../shared/utilities/HtmlUtility";

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

  const pushProduct = useCartStore((state) => state.pushProduct);

  const [activeTab, setActiveTab] = useState(null);

  useEffect(() => {
    const fetchProductCategories = async () => {
      try {
        const {_id} = Meteor.settings.public.app;
        const storeId = _id || selectedStore.franchiseId || selectedStore._id;

        const categories = await storesMethod.getProductCategories({ _id: storeId });

        setSelectedStoreProductCategories(categories.data);
        if (categories.data.length > 0) {
          setActiveTab(categories.data[0]._id);  // Set first category as default tab
        }
      } catch (error) {
        Log.error(error);
      }
    };

    const fetchProducts = async () => {
      try {
        const products = await storesMethod.getProducts({ _id: selectedStore._id });
        setSelectedStoreProducts(products.data);
      } catch (error) {
        Log.error(error);
      }
    };

    fetchProductCategories();
    fetchProducts();
  }, [selectedStore, setSelectedStoreProductCategories, setSelectedStoreProducts]);

  // Filter out categories with no products
  const categoriesWithProducts = selectedStoreProductCategories.filter(category =>
    selectedStoreProducts.some(product => product.categoryId === category._id)
  );

  // Filter products by the active category
  const filteredProducts = selectedStoreProducts.filter(
    product => product.categoryId === activeTab
  );

  const handleTabChange = (categoryId) => {
    setActiveTab(categoryId);
  };

  const onPushToCart = (product) => {
    pushProduct(product); // Add the product to the cart
    console.log(product);

    console.log(`Product added to cart: ${product._id}`);
  };

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
                <li key={category._id} className="cursor-pointer">
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
            {filteredProducts.map(product => (
              <div key={product._id} className="relative border p-4 mb-2 flex justify-between items-center">
                <div>
                  <h3 className="m-title font-bold uppercase flex items-center">
                    {product.title}
                    <Button
                      color="primary"
                      onClick={() => {
                        onPushToCart(product)
                      }}
                      size="sm"
                      className="absolute bottom-5 right-5 p-3 w-8 h-8 flex justify-center items-center border-secondary-100 border-2 rounded-full"
                      title="Add to Cart"
                    >
                      <FontAwesomeIcon icon={faCartPlus} className="text-secondary-100"/>
                    </Button>
                  </h3>
                  <CurrencyDisplay price={product.priceOut} currency="TRY" locale="tr-TR"/>
                  <p className="m-text text-xs">
                    {product.starCount || 1} <WalletIcon/>
                  </p>
                </div>
                <img
                  src={HtmlUtility.ImageUrl(product.imageUrl) || 'https://placehold.co/100x100'}
                  alt={product.title}
                  className="ml-4 w-24 h-24 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = HtmlUtility.ImageUrlOnError(product.imageUrl);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
