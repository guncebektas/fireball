import React from 'react';
import {useTranslator} from "../../providers/i18n";
import {H4} from "../../components/heading/Headings";
import {Button} from "flowbite-react";

export const WalletBalance = ({balance = 0, onAddMoney}) => {
  const t = useTranslator();

  const currency = 'TRY';
  const currencyPosition = 'after';

  const amounts = [20, 50, 100, 200, 250, 500];

  // Function to format the amount based on currency position
  const formatCurrency = (amount) => {
    return currencyPosition === 'before' ? `${currency} ${amount}` : `${amount} ${currency}`;
  };

  return (
    <div className="w-full">
      <H4 text={`${t('Wallet')}: ${formatCurrency(balance.toFixed(2))}`}/>

      <div className="mt-2 grid grid-cols-3 gap-2"> {/* Change to grid layout */}
        {amounts.map((amount) => (
          <Button
            color="primary"
            key={amount}
            onClick={() => onAddMoney(amount)}
          >
            {formatCurrency(amount)}
          </Button>
        ))}
      </div>
    </div>
  );
};
