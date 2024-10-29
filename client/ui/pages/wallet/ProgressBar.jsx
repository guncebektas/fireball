import React, {useState} from 'react';
import {Button, Modal} from 'flowbite-react';
import {H5} from "../../components/heading/Headings";
import {Faqs} from "../help/Faqs";
import {useTranslator} from "../../providers/i18n";

const ProgressBar = ({ target, current = 0 }) => {
  const t = useTranslator();
  const [modalOpen, setModalOpen] = useState(false);

  let progressPercentage = (current % target / target) * 100;
  if (progressPercentage > 100) {
    progressPercentage = 100;
  }

  const reward = Math.floor(current / target);

  return (
    <div className="mb-3">
      <div className="flex items-center space-x-4">
        <H5 text={t(`Earn one coffee with {$target} stars`, { target })} />
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <span className="m-text font-bold">{current % target}/{target}</span>
        </div>

        <div className="relative w-full h-4 bg-gray-200 dark:bg-gray-700 rounded">
          <div
            className="absolute h-full bg-green-700 rounded"
            style={{ width: `${progressPercentage}%` }}
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

        <Modal show={modalOpen} onClose={() => setModalOpen(false)}>
          <Modal.Header>{t('FAQs')}</Modal.Header>
          <Modal.Body>
            <Faqs showTitle={false} />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setModalOpen(false)} color="gray">
              {t('Close')}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default ProgressBar;
