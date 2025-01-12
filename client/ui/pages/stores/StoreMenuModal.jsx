import React, {useEffect, useState} from 'react';
import {useTranslator} from "../../providers/i18n";
import {Button, Modal} from "flowbite-react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useStoreStore} from "../../stores/useStoreStore";
import {storesMethod} from "../../../../imports/modules/app/stores/storesMethod";
import {Log} from "meteor/logging";
import {WalletIcon} from "../wallet/WalletIcon";
import CurrencyDisplay from "../../components/currencyDisplay/currencyDiplay";
import {faCartPlus} from "@fortawesome/free-solid-svg-icons/faCartPlus";
import {useCartStore} from "../../stores/useCartStore";
import {CartButton} from "../../components/buttons/CartButton";

export const StoreMenuModal = ({ store, isOpen, onClose }) => {
  if (!isOpen || !store) return null;

  const t = useTranslator();
  const {
    selectedStoreProductCategories,
    setSelectedStoreProductCategories,
    selectedStoreProducts,
    setSelectedStoreProducts
  } = useStoreStore();

  const pushProduct = useCartStore((state) => state.pushProduct);

  const [activeTab, setActiveTab] = useState(null);

  useEffect(() => {
    const fetchProductCategories = async () => {
      try {
        const {_id} = Meteor.settings.public.app;
        const storeId = _id || store.franchiseId || store._id;

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
        const products = await storesMethod.getProducts({ _id: store._id });
        setSelectedStoreProducts(products.data);
      } catch (error) {
        Log.error(error);
      }
    };

    fetchProductCategories();
    fetchProducts();
  }, [store, setSelectedStoreProductCategories, setSelectedStoreProducts]);

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
    <Modal dismissible show={isOpen} onClose={onClose}>
      <Modal.Header>
        {store.name}
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
              <div key={product._id} className="border p-4 mb-2 flex justify-between items-center">
                <div>
                  <h3 className="m-title font-bold uppercase flex items-center">
                    {product.title}
                    <Button
                      color="primary"
                      onClick={() => {
                        onPushToCart(product)
                      }}
                      size="sm"
                      className="ml-2 p-2 w-8 h-8 flex justify-center items-center rounded-full"
                      title="Add to Cart"
                    >
                      <FontAwesomeIcon icon={faCartPlus} className="text-white"/>
                    </Button>
                  </h3>
                  <CurrencyDisplay price={product.priceOut} currency="TRY" locale="tr-TR"/>
                  <p className="m-text text-xs">
                    {product.starCount || 1} <WalletIcon/>
                  </p>
                </div>
                <img
                  src={product.image || 'https://via.placeholder.com/100'}
                  alt={product.title}
                  className="ml-4 w-24 h-24 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
