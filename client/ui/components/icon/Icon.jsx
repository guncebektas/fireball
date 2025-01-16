import React from 'react';
import { Meteor } from 'meteor/meteor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Icon = ({ icon, className = '' }) => {
  const { customIcons } = Meteor.settings.public.app;
  
  const defaultClasses = 'w-6 h-5 transition duration-75';
  const combinedClasses = `${defaultClasses} ${className}`.trim();

  if (customIcons.includes(icon)) {
    return (
      <svg className={`svg-inline--fa ${combinedClasses}`}>
        <use href={`#${icon}`}/>
      </svg>
    )
  }
    
  return (
    <FontAwesomeIcon
      icon={icon}
      className={combinedClasses}
    />
  )
}
