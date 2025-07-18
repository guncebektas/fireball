import { Log } from "meteor/logging";
import { Meteor } from "meteor/meteor";
import React, { useEffect } from 'react';
import { storesMethod } from "../../../../imports/modules/app/stores/storesMethod";
import { HtmlUtility } from "../../../shared/utilities/HtmlUtility";
import { useStoreStore } from "../../stores/useStoreStore";
import { H5 } from "../heading/Headings.jsx";

export const StoryBoard = () => {
  const { _id } = Meteor.settings.public.app;
  const { storyBoardProducts, setStoryBoardProducts} = useStoreStore();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let products = await storesMethod.getProductsFilteredByImages({ _id });
        if (!products) {
          products = await storesMethod.getProducts({ _id });
        }

        const cleanedProducts = products.data.filter(product =>
          product.priceOut > Meteor.settings.public.pages.homepage.storyBoard.filter.price &&
          product.title.length < Meteor.settings.public.pages.homepage.storyBoard.filter.titleLength && // adjust this number based on your needs
          !product.title.toLowerCase().includes('sepet') &&
          !product.title.toLowerCase().includes('fark')
        );

        const shuffledProducts = cleanedProducts
        .sort(() => Math.random() - 0.5)
        .slice(0, 10);

        setStoryBoardProducts(shuffledProducts);
      } catch (error) {
        Log.error(error);
      }
    };

    fetchProducts();
  }, [_id]);

  const clearTitle = title => {
    if (!title) return title;

    const suffixRegex = / (B|Çb|S|M|L|Xl|Xxl)$/i;

    // Then use HtmlUtility to capitalize words properly with Turkish locale support
    return HtmlUtility.CapitalizeWordLetters(title).replace(suffixRegex, '');
  };

  return (
    <>
      <H5 text={'Have you tried these?'} className={'m-text text-primary-600 text-lg'} />
      <div className="flex overflow-x-auto gap-3 py-3 no-scrollbar snap-x snap-mandatory touch-pan-x">
        {storyBoardProducts.map((product) => (
          <div
            key={product._id}
            className="flex flex-col items-center min-w-[80px] snap-center"
          >
            <div className="w-[80px] h-[80px] rounded-full overflow-hidden mb-2">
              <img
                src={HtmlUtility.ImageUrl(product.imageUrl) || 'https://placehold.co/80x80'}
                alt={product.title}
                className="w-full h-full object-cover"
                draggable="false"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = HtmlUtility.ImageUrlOnError(product.imageUrl);
                }}
              />
            </div>
            <span className="m-text text-xs font-medium text-center">
              {clearTitle(product.title)}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};
