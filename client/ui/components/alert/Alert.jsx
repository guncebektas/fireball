import React from 'react';
import { Alert as FAlert} from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faCheckCircle, faExclamationTriangle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

// Map icon names to Font Awesome icons
const iconMap = {
  info: faInfoCircle,
  success: faCheckCircle,
  warning: faExclamationTriangle,
  error: faTimesCircle, // Changed to 'error' to match 'failure'
};

Alert.propTypes = {
  color: PropTypes.oneOf(['info', 'success', 'warning', 'failure']).isRequired,
  iconName: PropTypes.oneOf(['info', 'success', 'warning', 'error']).isRequired,
  children: PropTypes.node.isRequired,
};

export function Alert({ show, color, iconName, children }) {
  if (!show) return null;

  const icon = iconMap[iconName] || iconMap.info; // Default to info icon if iconName is invalid

  return (
    <FAlert color={color} className="flex items-center space-x-3 mb-3">
      <FontAwesomeIcon icon={icon} />
      {children}
    </FAlert>
  );
}
