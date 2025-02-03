import React from 'react';
import { Meteor } from 'meteor/meteor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * This component is a wrapper around the FontAwesomeIcon component to allow for custom icons to be used.
 * Be sure to define custom icons in svgSprite and in settings.json. If the icon is not found in customIcons,
 * the fallback FontAwesomeIcon icons will be displayed. Thus, define these icons in App.jsx.
 * @see App.jsx
 * @see svgSprite.jsx
 *
 * @param icon {string}
 * @param className {string}
 * @return {JSX.Element}
 * @constructor
 */
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
