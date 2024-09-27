import React from "react";
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

export const BackButton = () => {
  return (
    <Link
      to={-1}
      size="sm"
    >
      <FontAwesomeIcon icon={faArrowLeft} className="mr-1"/>
    </Link>
  );
};
