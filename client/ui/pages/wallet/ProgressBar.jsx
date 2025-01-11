import React, {useEffect, useState} from 'react';
import {Button, Modal} from 'flowbite-react';
import {H5} from "../../components/heading/Headings";
import {Faqs} from "../help/Faqs";
import {useTranslator} from "../../providers/i18n";
import {useStampCountStore} from "../../stores/useStampCountStore";
import {CircularProgressBar} from "../../components/progressBar/CircularProgressBar";

const ProgressBar = () => {
  const t = useTranslator();

  const {logo} = Meteor.settings.public.app;

  const {stampCount , targetCount} = useStampCountStore();

  let progressPercentage = 0
  let reward = 0;

  const [modalOpen, setModalOpen] = useState(false);

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
        <CircularProgressBar
          progress={progressPercentage}
          size={100}
          strokeWidth={8}
          icon={logo}
        />
      </div>
      <p className="m-text text-center font-bold" style={{'margin-top': '-15px'}}>{stampCount % targetCount}/{targetCount}</p>

      <div className="flex items-center space-x-4">
        <H5 text={t(`Earn one coffee with {$target} stars`, {target: targetCount})}/>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center ml-2">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-700 mr-1">
            <span className="text-white lg font-bold">{reward}</span>
          </div>
          <span className="text-green-700 dark:text-white font-bold text-lg ml-1">{t('Free')}</span>
        </div>
        <button
          className="text-lg text-blue-500 hover:underline"
          onClick={() => setModalOpen(true)}
        >
          {t('Details')}
        </button>

        <Modal dismissible show={modalOpen} onClose={() => setModalOpen(false)}>
          <Modal.Header>{t('FAQs')}</Modal.Header>
          <Modal.Body>
            <Faqs showTitle={false}/>
          </Modal.Body>
          <Modal.Footer>
            <Button color="default" onClick={() => setModalOpen(false)}>
              {t('Close')}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default ProgressBar;
