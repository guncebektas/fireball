import React from 'react';
import { H2 } from "../../components/heading/Headings";
import { useTranslator } from "../../providers/i18n";
import { Slider } from "../../components/slider/Slider";
import { SocialMediaIcons } from "../../components/buttons/SocialMediaIcons";

export const AboutUs = ({ fullPage = true }) => {
  const t = useTranslator();
  const { title, paragraphs, carousel } = Meteor.settings.public.pages.aboutUs;

  return (
    <>
      {fullPage && (
        <H2 text={title} />
      )}

      <div className="mt-6 mb-10">
        <Slider carousel={carousel} />
      </div>

      <div className="text-lg text-gray-500 space-y-6 mb-8">
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{t(paragraph)}</p>
        ))}
      </div>

      {fullPage && <SocialMediaIcons />}
    </>
  );
};
