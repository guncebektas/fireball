import React from 'react';
import { Carousel } from 'flowbite-react';
import {H2} from "../../components/heading/Headings";

export const AboutUs = () => {
  const { title, paragraphs, carousel } = Meteor.settings.public.pages.aboutUs;

  return (
    <>
      <div className="sm:flex sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center">
            <H2 text={title}></H2>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <Carousel className="h-64 lg:h-96 rounded-lg overflow-hidden shadow-lg" indicators={false}>
          {carousel.map((slide, index) => (
            <div key={index} className="relative w-full h-full">
              <img
                src={slide.image}
                alt={`Slide ${index + 1}`}
                className="object-cover w-full h-full"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-3 text-center">
                {slide.caption}
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      <div className="text-lg text-gray-500 space-y-6">
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </>
  );
};
