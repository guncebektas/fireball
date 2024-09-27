import React from 'react';
import {PriceItem} from "./PriceItem";
import {useTranslator} from "../../providers/i18n";

export const Prices = () => {
  const t = useTranslator();

  const handleSelect = (type) => {
      alert(type);
  }

  return (
    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
      <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text">{t('Designed for business teams like yours')}</h2>
        <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">{t('We focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth')}.</p>
      </div>
      <div className="my-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10">
        <PriceItem
          title={t('Starter')}
          subTitle={t('The best option for personal use & your next project')}
          price={'$29'}
          features={[t('Individual configuration'), t('No setup, or hidden fees'), 'Team size: 1']}
          onClick={handleSelect}
        />

        <PriceItem
          title={t('Professional')}
          subTitle={t('Relevant for multiple users, extended & premium support')}
          price={'$99'}
          features={[t('Individual configuration'), t('No setup, or hidden fees'), 'Team size: 3']}
          onClick={handleSelect}
        />

        <PriceItem
          title={t('Enterprise')}
          subTitle={t('Best for large scale uses and extended redistribution rights')}
          price={'$499'}
          features={[t('Individual configuration'), t('No setup, or hidden fees'), 'Team size: 100+']}
          onClick={handleSelect}
        />
      </div>
    </div>
  );
};
