import React from 'react';
import {H2} from "../../heading/Headings";
import {Icon} from "../../icon/Icon";
import {useTranslator} from "../../../providers/i18n";

const GameOverReward = ({reward}) => {
  if (reward === 0) {
    return null;
  }

  return (
    <>
      <div className="flex items-center justify-center gap-1 text-4xl m-title font-bold mb-2">
        <span className={'mr-1'}>{reward}</span>
        <span style={{lineHeight: '10px'}}><Icon icon={'star'}/></span>
      </div>
    </>
  );
};

const GameOverMessage = ({message, reward, nextChanceAt}) => {
  const t = useTranslator();

  return (
    <>
      <div className="scratch-card-wait-to-play">
        <div className="flex flex-col items-center justify-center mb-4">
          <GameOverReward reward={reward}/>

          <H2
            className='text-center mb-5'
            text={message}
          />

          <p className={'m-text text-center opacity-50'}>{t('Next chance at')}: {nextChanceAt}</p>
        </div>
      </div>
    </>
  );
};

export default GameOverMessage;
