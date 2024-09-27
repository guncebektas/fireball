import React from "react";
import {useTranslator} from "../../providers/i18n";
import {BackButton} from "../buttons/BackButton";

export const H2 = ({text, showBackButton = false}) => {
  const t = useTranslator();

  return (
    <>
      <h2 className="title text-4xl mb-3">{showBackButton ? <BackButton /> : ''} {t(text)}</h2>
    </>
  )
};

export const H3 = ({text}) => {
  const t = useTranslator();
  return (<h3 className="title text-2xl mb-3">{t(text)}</h3>);
};

export const H4 = ({text}) => {
  const t = useTranslator();
  return (<h4 className="title text-xl mb-3">{t(text)}</h4>);
};
