import React from 'react';

const CurrencyDisplay = ({ price, currency = 'USD', locale = 'en-US' }) => {
  const formattedPrice = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(price);

  return <p className="m-text">{formattedPrice}</p>;
};

export default CurrencyDisplay;
