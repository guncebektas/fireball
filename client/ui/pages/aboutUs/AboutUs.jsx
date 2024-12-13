import React from 'react';
import { H2 } from "../../components/heading/Headings";
import { useTranslator } from "../../providers/i18n";
import { Slider } from "../../components/slider/Slider";
import { SocialMediaIcons } from "../../components/buttons/SocialMediaIcons";
import {faFacebook, faInstagram, faLinkedin, faXTwitter, faYoutube} from "@fortawesome/free-brands-svg-icons";

const socialMediaLinks = [
  { icon: faFacebook, url: Meteor.settings.public.app.links.facebook, alt: 'Facebook' },
  { icon: faInstagram, url: Meteor.settings.public.app.links.instagram, alt: 'Instagram' },
  { icon: faXTwitter, url: Meteor.settings.public.app.links.x, alt: 'X' },
  { icon: faLinkedin, url: Meteor.settings.public.app.links.linkedin, alt: 'LinkedIn' },
  { icon: faYoutube, url: Meteor.settings.public.app.links.youtube, alt: 'YouTube' },
];

export const AboutUs = ({ fullPage = true }) => {
  const t = useTranslator();
  const { title, paragraphs, carousel } = Meteor.settings.public.pages.aboutUs;

  return (
    <>
      {fullPage && (
        <H2 text={title}/>
      )}

      <div className="mt-6 mb-10">
        <Slider carousel={carousel}/>
      </div>

      <div className="text-lg text-gray-500 space-y-6 mb-8">
        {paragraphs.map((paragraph, index) => (
          <div key={index}>
            <h3 className="text-xl font-semibold">{t(paragraph.title)}</h3>
            <p>{t(paragraph.text)}</p>
          </div>
        ))}
      </div>

      {fullPage && <SocialMediaIcons links={socialMediaLinks}/>}
    </>
  );
};
