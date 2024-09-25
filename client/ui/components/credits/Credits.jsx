import React from "react";

export const Credits = () => {
  return (
    <section className="fixed block w-full bottom-0 bg-white px-3 py-3 dark:bg-gray-900">
      <p className="text-gray-500 text-right text-xs">
        <span>Powered by </span>
        <a
          href="https://ritapos.com"
          target="_blank"
          className="float-right align-bottom"
        >
          <img src="https://app.ritapos.com/logo.png" alt="Ritapos" width="38" className="float-right"/>
        </a>
      </p>
    </section>
  );
};
