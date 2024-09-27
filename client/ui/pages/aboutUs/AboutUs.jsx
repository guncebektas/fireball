import React from 'react';
import {H2} from "../../components/heading/Headings";
import {useTranslator} from "../../providers/i18n";
import {Slider} from "../../components/slider/Slider";

export const AboutUs = () => {
  const t = useTranslator();
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
        <Slider carousel={carousel} />
      </div>

      <div className="text-lg text-gray-500 space-y-6">
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{t(paragraph)}</p>
        ))}
      </div>
    </>
  );
};
