import React from 'react';
import {Button} from 'flowbite-react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartShopping} from "@fortawesome/free-solid-svg-icons";
import {useTranslator} from "../../providers/i18n";
import {useCartStore} from "../../stores/useCartStore";

export const CartButton = () => {
  const t = useTranslator();

  const openCartModal = useCartStore((state) => state.openCartModal);
  const productCount = useCartStore((state) => state.products.length);

  if (productCount === 0) {
    return;
  }

  return (
    <Button color="blue" onClick={() => openCartModal()}>
      <FontAwesomeIcon icon={faCartShopping}/>
      <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
        {productCount}
      </span>

      {t('Your cart')}
    </Button>
  )
};
