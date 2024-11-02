import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

export const SocialMediaIcons = ({links}) => {
  return (
    <div className="flex space-x-4 mt-4">
      {links.map(({ icon, url, alt }, index) => (
        <a key={index} href={url} target="_blank" rel="noopener noreferrer" aria-label={alt}>
          <FontAwesomeIcon icon={icon} className="text-gray-500 hover:text-gray-800 transition-colors duration-300" size="lg" />
        </a>
      ))}
    </div>
  );
};
