import React, { useState } from 'react';
import { Button,TextInput, Label, Textarea } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faWallet } from '@fortawesome/free-solid-svg-icons';
import { useCartStore } from '../../stores/useCartStore';
import CurrencyDisplay from "../../components/currencyDisplay/currencyDiplay";
import {useTranslator} from "../../providers/i18n";
import {H2, H3} from "../../components/heading/Headings";

export const Checkout = () => {
  const t = useTranslator();

  const products = useCartStore((state) => state.products);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('creditCard');
  const [billingDetails, setBillingDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
  });

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckout = () => {
    // Handle checkout process
    console.log('Checkout with payment method:', selectedPaymentMethod);
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex justify-between">
        <H2 text={'Checkout'} />

        <div className="m-title text-lg">
          <p>{products.length} {products.length === 1 ? 'item' : 'items'}</p>
          <CurrencyDisplay price={products.reduce((total, product) => total + product.priceOut, 0)} currency="TRY" locale="tr-TR" />
        </div>
      </div>

      {/* Order Summary and Checkout Button */}
      <div className={"m-border rounded-lg p-4 shadow-md"}>
        <H3 text={'Order Summary'}/>

        <div className="mt-4">
          {products.map((product) => (
            <div key={product.rowNumber} className="flex justify-between items-center mt-2">
              <p className="m-text">{product.title}</p>
              <CurrencyDisplay price={product.priceOut} currency="TRY" locale="tr-TR"/>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-between items-center">
          <p className="m-text font-bold">{'Total'}</p>
          <CurrencyDisplay
            price={products.reduce((total, product) => total + product.priceOut, 0)}
            currency="TRY"
            locale="tr-TR"
          />
        </div>
      </div>

      {/* Billing Information */}
      <div className={"m-border rounded-lg p-4 shadow-md"}>
        <H3 text={'Billing Information'} />

        <div className="grid grid-cols-1 sm:grid-cols-2 mt-4">
          <div>
            <Label htmlFor="firstName">{'First Name'}</Label>
            <TextInput
              id="firstName"
              type="text"
              name="firstName"
              value={billingDetails.firstName}
              onChange={handleBillingChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="lastName">{'Last Name'}</Label>
            <TextInput
              id="lastName"
              type="text"
              name="lastName"
              value={billingDetails.lastName}
              onChange={handleBillingChange}
              required
            />
          </div>
        </div>
        <div className="mt-4">
          <Label htmlFor="email">{'Email'}</Label>
          <TextInput
            id="email"
            type="email"
            name="email"
            value={billingDetails.email}
            onChange={handleBillingChange}
            required
          />
        </div>
        <div className="mt-4">
          <Label htmlFor="address">{'Address'}</Label>
          <Textarea
            id="address"
            name="address"
            value={billingDetails.address}
            onChange={handleBillingChange}
            required
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 mt-4">
          <div>
            <Label htmlFor="city">{'City'}</Label>
            <TextInput
              id="city"
              type="text"
              name="city"
              value={billingDetails.city}
              onChange={handleBillingChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="postalCode">{'Postal Code'}</Label>
            <TextInput
              id="postalCode"
              type="text"
              name="postalCode"
              value={billingDetails.postalCode}
              onChange={handleBillingChange}
              required
            />
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className={"m-border rounded-lg p-4 shadow-md"}>
        <H3 text={'Payment Method'}/>

        <div className="mt-4">
          <div className="flex items-center">
            <TextInput
              type="radio"
              id="creditCard"
              name="paymentMethod"
              value="creditCard"
              checked={selectedPaymentMethod === 'creditCard'}
              onChange={() => handlePaymentMethodChange('creditCard')}
            />
            <Label htmlFor="creditCard" className="ml-2 text-lg">
              <FontAwesomeIcon icon={faCreditCard} className="mr-2"/>
              {'Credit Card'}
            </Label>
          </div>
          {selectedPaymentMethod === 'creditCard' && (
            <div className="mt-4">
              <TextInput
                type="text"
                placeholder="Card Number"
                className="mb-4"
                required
              />
              <TextInput
                type="text"
                placeholder="Expiration Date"
                className="mb-4"
                required
              />
              <TextInput
                type="text"
                placeholder="CVV"
                required
              />
            </div>
          )}
        </div>
        <div className="mt-4">
          <div className="flex items-center">
            <TextInput
              type="radio"
              id="wallet"
              name="paymentMethod"
              value="wallet"
              checked={selectedPaymentMethod === 'wallet'}
              onChange={() => handlePaymentMethodChange('wallet')}
            />
            <Label htmlFor="wallet" className="ml-2 text-lg">
              <FontAwesomeIcon icon={faWallet} className="mr-2"/>
              {'Wallet'}
            </Label>
          </div>
          {selectedPaymentMethod === 'wallet' && (
            <div className="mt-4">
              <p className={'m-text'}>{'Your current balance: '}</p>
              <CurrencyDisplay price={1000} currency="TRY" locale="tr-TR"/>
              <p className="text-sm text-gray-500">{'Balance will be deducted on payment.'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
