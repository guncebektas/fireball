import React from 'react';
import {useTranslator} from "../../providers/i18n";
import {Carousel} from "flowbite-react";

export const Slider = ({carousel, showCaption = false, indicators = false, interval = 3000}) => {
  const t = useTranslator();

  return (
    <Carousel className="h-64 lg:h-96 rounded-lg overflow-hidden shadow-lg" indicators={indicators} slideInterval={interval}>
      {carousel.map((slide, index) => (
          <div key={index} className="relative w-full h-full">
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className="object-cover w-full h-full"
            />

            {
              showCaption ?
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-3 text-center">
                  {t(slide.caption)}
                </div> : ''
            }
          </div>
        )
      )}
    </Carousel>
  );
};
