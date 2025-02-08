import React, {useEffect, useState} from 'react';
import {useTranslator} from "../../providers/i18n";
import {useStampCountStore} from "../../stores/useStampCountStore";
import {CircularProgressBar} from "../../components/progressBar/CircularProgressBar";
import {useRouteUtility} from "../../../shared/utilities/RouteUtility";

const ProgressBar = () => {
  const t = useTranslator();
  const { isHomepage } = useRouteUtility();

  const {coinName, coinIcon} = Meteor.settings.public.app;

  const {stampCount, targetCount} = useStampCountStore();
  
  // Add state for progress and reward
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [reward, setReward] = useState(0);

  useEffect(() => {
    // Calculate progress percentage
    let progress = (stampCount % targetCount / targetCount) * 100;
    if (progress > 100) {
      progress = 100;
    }
    
    setProgressPercentage(progress);
    setReward(Math.floor(stampCount / targetCount));
  }, [stampCount, targetCount]);

  return (
    <div className="mb-3">
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <div className="flex w-1/3 items-center justify-center ml-2">
          <div className="items-center justify-center">
            <p className={`${isHomepage ? 'm-text' : 'm-text'} font-normal`}>{coinName}</p>
            <h5 className={`${isHomepage ? 'm-text' : 'm-text'} text-center font-extrabold`}>{stampCount}</h5>
          </div>
        </div>

        <CircularProgressBar
          progress={progressPercentage}
          size={80}
          strokeWidth={8}
          icon={coinIcon}
        />

        <div className="flex w-1/3 items-center justify-center ml-2">
          <div className="items-center justify-center">
            <p className={`${isHomepage ? 'm-text' : 'm-text'} font-normal`}>{t('Free')}</p>
            <h5 className={`${isHomepage ? 'm-text' : 'm-text'} text-center font-extrabold`}>{reward}</h5>
          </div>
        </div>
      </div>

      <p className="text-white text-center font-bold" style={{marginTop: '-15px'}}>{stampCount % targetCount}/{targetCount}</p>
    </div>
  );
};

export default ProgressBar;
