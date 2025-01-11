import React from 'react';
import {useTranslator} from "../../providers/i18n";
import {H5} from "../heading/Headings.jsx";

export const StoryBoard = () => {
  const t = useTranslator();

  const products = [
    {
      id: 1,
      name: 'Espresso',
      image: 'https://placehold.co/80x80'
    },
    {
      id: 2,
      name: 'Latte',
      image: 'https://placehold.co/80x80'
    },
    {
      id: 3,
      name: 'Cappuccino',
      image: 'https://placehold.co/80x80'
    },
    {
      id: 4,
      name: 'Mocha',
      image: 'https://placehold.co/80x80'
    },
    {
      id: 5,
      name: 'Americano',
      image: 'https://placehold.co/80x80'
    }
  ];

  return (
    <>
      <H5 text={'Have you tried these?'}/>
      <div className="flex overflow-x-auto gap-3 pb-4 no-scrollbar snap-x snap-mandatory touch-pan-x">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="flex flex-col items-center min-w-[80px] snap-center"
          >
            <div className="w-[80px] h-[80px] rounded-full overflow-hidden mb-2">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
                draggable="false"
              />
            </div>
            <span className="m-text text-sm font-medium text-center">{product.name}</span>
          </div>
        ))}
      </div>
    </>
  );
};
