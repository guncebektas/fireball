import React from "react";

export const H2 = ({text}) => {
  return (<h2 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white mb-3">{text}</h2>);
};

export const H3 = ({text}) => {
  return (<h3 className="text-2xl tracking-tight font-extrabold text-gray-900 dark:text-white mb-3">{text}</h3>);
};

export const H4 = ({text}) => {
  return (<h4 className="tracking-tight font-extrabold text-gray-900 dark:text-white mb-3">{text}</h4>);
};
