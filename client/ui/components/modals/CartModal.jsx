import React from 'react';
import {Button, Modal} from 'flowbite-react';
import {useTranslator} from '../../providers/i18n';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHeart, faMapMarkerAlt, faMinus, faPhone, faPlus} from '@fortawesome/free-solid-svg-icons';
import {useCartStore} from '../../stores/useCartStore';
import Map from "../map/Map";
import CurrencyDisplay from "../currencyDisplay/currencyDiplay";

export const CartModal = () => {
  const t = useTranslator();

  const isCartModalOpen = useCartStore((state) => state.isCartModalOpen);
  const closeCartModal = useCartStore((state) => state.closeCartModal);

  const products = useCartStore((state) => state.products);
  const pushProduct = useCartStore((state) => state.pushProduct);
  const pullProduct = useCartStore((state) => state.pullProduct);

  const handleCheckout = () => {
    console.log('handleCheckout')
  }
  return (
    <Modal show={isCartModalOpen} onClose={closeCartModal} size="md">
      <Modal.Header>{t('Your cart')}</Modal.Header>
      <Modal.Body>
        <div className="flex flex-col space-y-4">
          {products && products.map((product) => (
            <div key={product.rowNumber} className="flex justify-between items-center p-4 border rounded-lg shadow-sm">
              <div>
                <p className="text-xs text-gray-500">{product.categoryTitle}</p>
                <h3 className="text-lg font-semibold">{product.title}</h3>
                <p className="text-sm text-gray-500">
                  <CurrencyDisplay price={product.priceOut} currency="TRY" locale="tr-TR"/>
                </p>
              </div>
              <Button.Group>
                <Button
                  size="sm"
                  color="green"
                  className={"text-green-300 mr-1"}
                  onClick={() => pushProduct(product)} // Define this action in your `useCartStore`
                >
                  <FontAwesomeIcon icon={faPlus}/>
                </Button>
                <Button
                  size="sm"
                  color="red"
                  className={"text-red-300"}
                  onClick={() => pullProduct(product)} // Define this action in your `useCartStore`
                >
                  <FontAwesomeIcon icon={faMinus}/>
                </Button>
              </Button.Group>
            </div>
          ))}
          {products.length === 0 && (
            <p className="text-center text-gray-500">{t('Your cart is empty')}</p>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="flex justify-between w-full">
          <Button color="default" onClick={closeCartModal}>
            {t('Close')}
          </Button>
          <Button color="blue" onClick={handleCheckout}>
            <FontAwesomeIcon icon={faHeart} className="mr-2"/> {t('Pay now')}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
