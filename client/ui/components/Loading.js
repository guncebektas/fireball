import React from 'react';
import {Log} from "meteor/logging";
import {useTranslator} from "../providers/i18n";

export const Loading = ({ name }) => {
  const t = useTranslator();

  if (name) {
    // eslint-disable-next-line no-console
    Log.error('Loading', name);
  }

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="h-32 w-32 rounded-full border-b-2 border-gray-900">
        {t('Loading')}...
      </div>
    </div>
  );
};
