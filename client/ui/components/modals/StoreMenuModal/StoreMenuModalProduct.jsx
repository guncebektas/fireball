import {Button} from "flowbite-react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartPlus} from "@fortawesome/free-solid-svg-icons/faCartPlus";
import CurrencyDisplay from "../../currencyDisplay/currencyDiplay";
import {WalletIcon} from "../../../pages/wallet/WalletIcon";
import {HtmlUtility} from "../../../../shared/utilities/HtmlUtility";
import React from "react";
import {Log} from "meteor/logging";
import {useCartStore} from "../../../stores/useCartStore";

export const StoreMenuModalProduct = ({products}) => {
  const pushProduct = useCartStore((state) => state.pushProduct);

  const onPushToCart = (product) => {
    pushProduct(product); // Add the product to the cart
    Log.info(`Product added to cart: ${product._id}`);
  };

  return (
    products.map(product => (
      <div key={product._id} data-test-id={product._id} className="relative border p-4 mb-2 flex justify-between items-center">
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
    ))
  )
}
