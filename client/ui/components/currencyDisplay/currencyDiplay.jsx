import React from 'react';

const CurrencyDisplay = ({ price, currency = 'USD', locale = 'en-US' }) => {
  let formattedPrice;
  
  if (locale === 'tr-TR') {
    // For Turkish locale, format the number first and then append the currency symbol
    const numberFormatter = new Intl.NumberFormat(locale, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    const currencySymbol = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      currencyDisplay: 'symbol',
    }).format(0).replace(/[\d,]/g, '').trim();
    
    formattedPrice = `${numberFormatter.format(price)} ${currencySymbol}`;
  } else {
    // For other locales, use the standard currency formatting
    formattedPrice = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
    }).format(price);
  }

  return <p className="m-text">{formattedPrice}</p>;
};

export default CurrencyDisplay;
