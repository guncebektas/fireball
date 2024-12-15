import React, {useEffect, useState} from 'react';
import {Button, Modal} from 'flowbite-react';
import {H5} from "../../components/heading/Headings";
import {Faqs} from "../help/Faqs";
import {useTranslator} from "../../providers/i18n";
import {useStampCountStore} from "../../stores/useStampCountStore";

const ProgressBar = () => {
  const t = useTranslator();
  const {stampCount , targetCount} = useStampCountStore();

  let progressPercentage = 0
  let reward = 0;

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    console.log(stampCount);

    progressPercentage = (stampCount % targetCount / targetCount) * 100;
    if (progressPercentage > 100) {
      progressPercentage = 100;
    }

    reward = Math.floor(stampCount / targetCount);
  }, [stampCount]);

  return (
    <div className="mb-3">
      <div className="flex items-center space-x-4">
        <H5 text={t(`Earn one coffee with {$target} stars`, {target: targetCount})}/>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <span className="m-text font-bold">{stampCount % targetCount}/{targetCount}</span>
        </div>

        <div className="relative w-full h-4 bg-gray-200 dark:bg-gray-700 rounded">
          <div
            className="absolute h-full bg-green-700 rounded"
            style={{width: `${progressPercentage}%`}}
          />
        </div>

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
            <Button  color="default" onClick={() => setModalOpen(false)}>
              {t('Close')}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default ProgressBar;
