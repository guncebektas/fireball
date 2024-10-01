// SocialMediaIcons.js
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFacebook, faInstagram, faLinkedin, faXTwitter, faYoutube} from '@fortawesome/free-brands-svg-icons';

const socialMediaLinks = [
  { icon: faFacebook, url: Meteor.settings.public.app.links.facebook, alt: 'Facebook' },
  { icon: faInstagram, url: Meteor.settings.public.app.links.instagram, alt: 'Instagram' },
  { icon: faXTwitter, url: Meteor.settings.public.app.links.x, alt: 'X' },
  { icon: faLinkedin, url: Meteor.settings.public.app.links.linkedin, alt: 'LinkedIn' },
  { icon: faYoutube, url: Meteor.settings.public.app.links.youtube, alt: 'YouTube' },
];

export const SocialMediaIcons = () => {
  return (
    <div className="flex space-x-4 mt-4">
      {socialMediaLinks.map(({ icon, url, alt }, index) => (
        <a key={index} href={url} target="_blank" rel="noopener noreferrer" aria-label={alt}>
          <FontAwesomeIcon icon={icon} className="text-gray-500 hover:text-gray-800 transition-colors duration-300" size="lg" />
        </a>
      ))}
    </div>
  );
};
