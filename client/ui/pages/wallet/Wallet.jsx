import React from 'react';
import {Tooltip} from 'flowbite-react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faStar as faStarFull, faStarHalfAlt} from '@fortawesome/free-solid-svg-icons';
import {faStar as faStarEmpty} from '@fortawesome/free-regular-svg-icons';

export const Wallet = () => {

  const Stars = (totalStars, filledStars) => {
    let stars = [];
    for (let i = 1; i <= totalStars; i++) {
      if (i <= filledStars) {
        stars.push(
          <Tooltip key={i} content="Filled Star">
            <FontAwesomeIcon icon={faStarFull} className="text-yellow-400 text-xl"/>
          </Tooltip>
        );
      } else if (i - filledStars < 1 && i - filledStars > 0) {
        stars.push(
          <Tooltip key={i} content="Half Star">
            <FontAwesomeIcon icon={faStarHalfAlt} className="text-yellow-400 text-xl"/>
          </Tooltip>
        );
      } else {
        stars.push(
          <Tooltip key={i} content="Empty Star">
            <FontAwesomeIcon icon={faStarEmpty} className="text-yellow-400 text-xl"/>
          </Tooltip>
        );
      }
    }
    return stars;
  };

  return (
    <div className="flex space-x-1">
      {Stars(5, 2.5)}
    </div>
  );
};
