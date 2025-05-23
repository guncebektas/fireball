import React from 'react';
import {useTranslator} from "../../providers/i18n";
import {H5} from "../heading/Headings.jsx";
import {useEffect} from "react";
import {storesMethod} from "../../../../imports/modules/app/stores/storesMethod";
import {Log} from "meteor/logging";
import {useStoreStore} from "../../stores/useStoreStore";

export const StoryBoard = () => {
  const t = useTranslator();

  const {_id} = Meteor.settings.public.app;
  const {
    selectedStoreProducts,
    setSelectedStoreProducts
  } = useStoreStore();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await storesMethod.getProducts({ _id });

        const cleanedProducts = products.data.filter(product =>
          product.priceOut > Meteor.settings.public.pages.homepage.storyBoard.filter.price &&
          product.title.length < Meteor.settings.public.pages.homepage.storyBoard.filter.titleLength && // adjust this number based on your needs
          !product.title.toLowerCase().includes('sepet') &&
          !product.title.toLowerCase().includes('fark')
        );

        const shuffledProducts = cleanedProducts
          .sort(() => Math.random() - 0.5)
          .slice(0, 10);

        setSelectedStoreProducts(shuffledProducts);
      } catch (error) {
        Log.error(error);
      }
    };

    fetchProducts();
  }, [_id, selectedStoreProducts, setSelectedStoreProducts]);

  return (
    <>
      <H5 text={'Have you tried these?'} className={'m-text text-primary-600 text-lg'}/>
      <div className="flex overflow-x-auto gap-3 py-3 no-scrollbar snap-x snap-mandatory touch-pan-x">
        {selectedStoreProducts.map((product) => (
          <div
            key={product._id}
            className="flex flex-col items-center min-w-[80px] snap-center"
          >
            <div className="w-[80px] h-[80px] rounded-full overflow-hidden mb-2">
              <img
                src={product.imageUrl || 'https://placehold.co/80x80'}
                alt={product.title}
                className="w-full h-full object-cover"
                draggable="false"
              />
            </div>
            <span className="m-text text-xs font-medium text-center">
              {product.title}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};
