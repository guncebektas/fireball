import React from 'react';
import {Button, Modal} from 'flowbite-react';
import {useTranslator} from '../../providers/i18n';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCartShopping, faHeart, faMinus, faPlus} from '@fortawesome/free-solid-svg-icons';
import {useCartStore} from '../../stores/useCartStore';
import CurrencyDisplay from "../currencyDisplay/currencyDiplay";
import {Link} from "react-router-dom";
import {ROUTE} from "../../../routes/enums/route";

export const CartModal = () => {
  const t = useTranslator();

  const productCount = useCartStore((state) => state.products.length);

  const isCartModalOpen = useCartStore((state) => state.isCartModalOpen);
  const closeCartModal = useCartStore((state) => state.closeCartModal);

  const products = useCartStore((state) => state.products);
  const pushProduct = useCartStore((state) => state.pushProduct);
  const pullProduct = useCartStore((state) => state.pullProduct);
  const clearCart = useCartStore((state) => state.clearCart);

  const handleCheckout = () => {
    console.log('handleCheckout')
  }
  return (
    <Modal dismissible show={isCartModalOpen} onClose={closeCartModal}>
      <Modal.Header>
        <FontAwesomeIcon icon={faCartShopping}/>
        <span className={"relative"}>
          {t('Your cart')}
          <span className="absolute top-0 left-20 -translate-y-1/2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {productCount}
          </span>
        </span>
      </Modal.Header>
      <Modal.Body>
        <div className="flex flex-col space-y-4">
          {products && products.map((product) => (
            <div key={product.rowNumber} className="flex justify-between items-center p-4 border rounded-lg shadow-sm">
              <div>
                <p className="text-xs m-text">{product.categoryTitle}</p>
                <h3 className="text-lg font-semibold m-title">{product.title}</h3>
                <CurrencyDisplay price={product.priceOut} currency="TRY" locale="tr-TR"/>
              </div>
              <Button.Group>
                <Button
                  size="sm"
                  outline
                  className={"text-green-300 mr-1"}
                  onClick={() => pushProduct(product)}
                >
                  <FontAwesomeIcon icon={faPlus}/>
                </Button>
                <Button
                  size="sm"
                  outline
                  className={"text-red-300"}
                  onClick={() => pullProduct(product)}
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
        <Button color="default" className={"m-text"} onClick={clearCart}>
          {t('Clear')}
        </Button>
        <div className="flex justify-between w-full">
          <Button color="default" className={"m-text"} onClick={closeCartModal}>
            {t('Close')}
          </Button>
          <Link to={ROUTE.CHECKOUT} className="m-button flex items-center" color={"blue"}>
            <FontAwesomeIcon icon={faHeart} className="mr-2" />
            {t('Pay now')}
          </Link>
        </div>
      </Modal.Footer>
    </Modal>
  );
};
