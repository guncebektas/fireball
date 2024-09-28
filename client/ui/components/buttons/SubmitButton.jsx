// SubmitButton.js
import React from 'react';
import { Button } from 'flowbite-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import { faSpinner } from '@fortawesome/free-solid-svg-icons'; // Import spinner icon

const SubmitButton = ({ isLoading, text, ...props }) => {
  return (
    <Button type="submit" color="primary" disabled={isLoading} {...props}>
      {isLoading ? (
        <>
          <FontAwesomeIcon icon={faSpinner} spin className="mr-2" /> {/* Spinner icon */}
          {text.loading} {/* Change button text while loading */}
        </>
      ) : (
        text.default // Default button text
      )}
    </Button>
  );
};

export default SubmitButton;
