import React from "react";
import {useTranslator} from "../../providers/i18n";
import {BackButton} from "../buttons/BackButton";

const translateWithSymbol = (text, t) => {
  const lastChar = text.slice(-1);
  const hasSymbol = /[!?:]/.test(lastChar);
  const textContent = hasSymbol ? text.slice(0, -1) : text;
  return t(textContent) + (hasSymbol ? lastChar : '');
};

export const H2 = ({text, showBackButton = false, ...props}) => {
  const t = useTranslator();
  return (
    <>
      <h2 className="m-title text-3xl mb-1" {...props}>
        {showBackButton ? <BackButton /> : ''} {translateWithSymbol(text, t)}
      </h2>
    </>
  )
};

export const H3 = ({text, ...props}) => {
  const t = useTranslator();
  return (<h3 className="m-title text-2xl mb-3" {...props}>{translateWithSymbol(text, t)}</h3>);
};

export const H4 = ({text, ...props}) => {
  const t = useTranslator();
  return (<h4 className="m-title text-xl mb-3" {...props}>{translateWithSymbol(text, t)}</h4>);
};

export const H5 = ({text, ...props}) => {
  const t = useTranslator();
  return (<h5 className="m-title text-lg" {...props}>{translateWithSymbol(text, t)}</h5>);
};
