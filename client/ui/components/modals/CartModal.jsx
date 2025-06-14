import React, {useState} from 'react';
import {Button, Modal} from 'flowbite-react';
import {useTranslator} from '../../providers/i18n';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowLeft, faCartShopping, faHeart, faMinus, faPlus} from '@fortawesome/free-solid-svg-icons';
import {useCartStore} from '../../stores/useCartStore';
import CurrencyDisplay from "../currencyDisplay/currencyDiplay";
import {Link} from "react-router-dom";
import {ROUTE} from "../../../routes/enums/route";
import {useStoreStore} from '../../stores/useStoreStore';

export const CartModal = () => {
  const t = useTranslator();

  const productCount = useCartStore((state) => state.products.length);
  const { selectedStore, setSelectedStore, openMenuModal } = useStoreStore();

  const isCartModalOpen = useCartStore((state) => state.isCartModalOpen);
  const closeCartModal = useCartStore((state) => state.closeCartModal);

  const products = useCartStore((state) => state.products);
  const groupedProducts = useCartStore((state) => state.groupedProducts);

  const pushProduct = useCartStore((state) => state.pushProduct);
  const pullProduct = useCartStore((state) => state.pullProduct);

  const handleOpenMenuModal = () => {
    openMenuModal();
    closeCartModal();
    setSelectedStore(selectedStore);
  };

  const clearCart = useCartStore((state) => state.clearCart);

  return (
    <>
      <Modal dismissible show={isCartModalOpen} onClose={closeCartModal}>
        <Modal.Header>
          <FontAwesomeIcon icon={faCartShopping} />
          <span className={"relative"}>
            {t('Your cart')}
            <span className="absolute top-0 left-20 -translate-y-1/2 bg-secondary-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {productCount}
            </span>
          </span>
        </Modal.Header>
        <Modal.Body>
          <div className="flex justify-between w-full mb-4">
            <Button color="default" className={"m-text"} onClick={handleOpenMenuModal}>
              <FontAwesomeIcon icon={faArrowLeft} />
              {t('Continue shopping')}
            </Button>

            <Button color="default" className={"m-text"} onClick={clearCart}>
              {t('Clear')}
            </Button>
          </div>

          <div className="flex flex-col space-y-4">
            {groupedProducts && groupedProducts.map((product) => (
              <div key={product.rowNumber} className="flex justify-between items-center p-4 border rounded-lg shadow-sm">
                <div>
                  <p className="text-xs m-text">{product.categoryTitle}</p>
                  <h3 className="text-lg font-semibold m-title">{product.quantity} x {product.title}</h3>
                  <CurrencyDisplay price={product.quantity * product.priceOut} currency="TRY" locale="tr-TR" />
                </div>
                <Button.Group>
                  <Button
                    size="sm"
                    outline
                    className={"text-green-300 mr-1"}
                    onClick={() => pushProduct(product)}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </Button>
                  <Button
                    size="sm"
                    outline
                    className={"text-red-300"}
                    onClick={() => pullProduct(product)}
                  >
                    <FontAwesomeIcon icon={faMinus} />
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
            <Button color="default" className={"m-text"} onClick={closeCartModal}>
              {t('Close')}
            </Button>
            <Link to={ROUTE.CHECKOUT} className="flex items-center text-primary-600" onClick={closeCartModal}>
              <FontAwesomeIcon icon={faHeart} className="mr-2" />
              {t('Pay now')}
            </Link>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};
