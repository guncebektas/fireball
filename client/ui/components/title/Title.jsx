import React from "react";
import {H2} from "../heading/Headings";
import {useTranslator} from "../../providers/i18n";

export const Title = ({text, centered = false}) => {
  const t = useTranslator();

  if (centered) {
    return (
      <H2 className="font-bold text-center mb-6" text={t(text)}/>
    )
  }

  return (
    <div className="sm:flex sm:items-start sm:justify-between">
      <div>
        <div className="flex items-center">
          <H2 text={t(text)}/>
        </div>
      </div>
    </div>
  );
};
