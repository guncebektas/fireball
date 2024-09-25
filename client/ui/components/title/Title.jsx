import React from "react";
import {H2} from "../heading/Headings";

export const Title = ({title, centered = false}) => {
  if (centered) {
    return (
      <H2 className="font-bold text-center mb-6" text="Stores"/>
    )
  }

  return (
    <div className="sm:flex sm:items-start sm:justify-between">
      <div>
        <div className="flex items-center">
          <H2 text={title}/>
        </div>
      </div>
    </div>
  );
};
