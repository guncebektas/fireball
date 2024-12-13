import React from "react";
import {useTranslator} from "../../providers/i18n";
import {BackButton} from "../buttons/BackButton";

export const H2 = ({text, showBackButton = false, ...props}) => {
  const t = useTranslator();

  return (
    <>
      <h2 className="m-title text-3xl mb-1" {...props}>
        {showBackButton ? <BackButton /> : ''} {t(text)}
      </h2>
    </>
  )
};

export const H3 = ({text, ...props}) => {
  const t = useTranslator();
  return (<h3 className="m-title text-2xl mb-3" {...props}>{t(text)}</h3>);
};

export const H4 = ({text, ...props}) => {
  const t = useTranslator();
  return (<h4 className="m-title text-xl mb-3" {...props}>{t(text)}</h4>);
};

export const H5 = ({text, ...props}) => {
  const t = useTranslator();
  return (<h5 className="m-title text-lg" {...props}>{t(text)}</h5>);
};
