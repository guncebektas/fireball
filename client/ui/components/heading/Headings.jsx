import React from "react";
import {useTranslator} from "../../providers/i18n";
import {BackButton} from "../buttons/BackButton";

const translateWithSymbol = (text, t) => {
  const lastChar = text.slice(-1);
  const hasSymbol = /[!?:]/.test(lastChar);
  const textContent = hasSymbol ? text.slice(0, -1) : text;
  return t(textContent) + (hasSymbol ? lastChar : '');
};

export const H1 = ({text, showBackButton = false, className = '', ...props}) => {
  const t = useTranslator();
  return (
    <h1 className={`m-title text-4xl ${className}`} {...props}>
      {showBackButton && <BackButton />} {translateWithSymbol(text, t)}
    </h1>
  );
};

export const H2 = ({text, showBackButton = false, className = '', ...props}) => {
  const t = useTranslator();
  return (
    <h2 className={`m-title text-3xl ${className}`} {...props}>
      {showBackButton && <BackButton />} {translateWithSymbol(text, t)}
    </h2>
  );
};

export const H3 = ({text, className = '', ...props}) => {
  const t = useTranslator();
  return (
    <h3 className={`m-title text-2xl ${className}`} {...props}>
      {translateWithSymbol(text, t)}
    </h3>
  );
};

export const H4 = ({text, className = '', ...props}) => {
  const t = useTranslator();
  return (
    <h4 className={`m-title text-xl ${className}`} {...props}>
      {translateWithSymbol(text, t)}
    </h4>
  );
};

export const H5 = ({text, className = 'm-title text-lg', ...props}) => {
  const t = useTranslator();
  return (
    <h5 className={className} {...props}>
      {translateWithSymbol(text, t)}
    </h5>
  );
};

export const H6 = ({text, className = 'm-title text-base', ...props}) => {
  const t = useTranslator();
  return (
    <h6 className={className} {...props}>
      {translateWithSymbol(text, t)}
    </h6>
  );
};
