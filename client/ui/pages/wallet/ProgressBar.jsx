import React, {useEffect} from 'react';
import {useTranslator} from "../../providers/i18n";
import {useStampCountStore} from "../../stores/useStampCountStore";
import {CircularProgressBar} from "../../components/progressBar/CircularProgressBar";

const ProgressBar = () => {
  const t = useTranslator();

  const {logo, coinName} = Meteor.settings.public.app;

  const {stampCount, targetCount} = useStampCountStore();

  let progressPercentage = 0
  let reward = 0;

  useEffect(() => {
    progressPercentage = (stampCount % targetCount / targetCount) * 100;
    if (progressPercentage > 100) {
      progressPercentage = 100;
    }

    reward = Math.floor(stampCount / targetCount);
  }, [stampCount]);

  return (
    <div className="mb-3">
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <div className="flex w-1/3 items-center justify-center ml-2">
          <div className="items-center justify-center">
            <p className="m-text">{coinName}</p>
            <h5 className="m-title">{reward}</h5>
          </div>
        </div>

        <CircularProgressBar
          progress={progressPercentage}
          size={100}
          strokeWidth={8}
          icon={logo}
        />

        <div className="flex w-1/3 items-center justify-center ml-2">
          <div className="items-center justify-center">
            <p className="m-text">{t('Free')}</p>
            <h5 className="m-title">{reward}</h5>
          </div>
        </div>
      </div>

      <p className="m-text text-center font-bold" style={{marginTop: '-15px'}}>{stampCount % targetCount}/{targetCount}</p>
    </div>
  );
};

export default ProgressBar;
