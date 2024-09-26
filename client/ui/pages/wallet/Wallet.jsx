import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { useTranslator } from "../../providers/i18n";
import {Modal, Accordion, Button} from 'flowbite-react'; // Import Modal and Accordion from Flowbite

const FAQs = [
  { question: 'Bu uygulama nasıl çalışıyor?', answer: 'Uygulama, kullanıcıların belirli hedeflere ulaşmalarına yardımcı olur.' },
  { question: 'Nasıl para ekleyebilirim?', answer: 'Para eklemek için, istediğiniz miktara tıklayın.' },
  { question: 'Hediye kahve nasıl kazanabilirim?', answer: 'Hedeflerinizi tamamlayarak hediye kahve kazanabilirsiniz.' },
  { question: 'Destek alabilir miyim?', answer: 'Destek almak için lütfen müşteri hizmetleri ile iletişime geçin.' },
];

const ProgressBar = ({ target, current, reward }) => {
  const t = useTranslator();

  const [modalOpen, setModalOpen] = useState(false);

  const progressPercentage = (current / target) * 100;

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center">
        <span className="font-bold">{current}/{target}</span>
      </div>

      <div className="relative w-full h-4 bg-gray-200 rounded">
        <div
          className="absolute h-full bg-green-300 rounded"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <div className="flex items-center ml-2">
        <FontAwesomeIcon icon={faCoffee} className="text-brown-500 text-xl mr-1" />
        <div className="w-6 h-6 flex items-center justify-center rounded-full bg-green-300 mr-1">
          <span className="text-sm font-bold">{reward}</span>
        </div>
        <span className="ml-1 text-xs">{t('Free')}</span>
      </div>
      <button
        className="text-blue-500 hover:underline"
        onClick={() => setModalOpen(true)}
      >
        {t('Details')}
      </button>

      {/* Modal for FAQs */}
      <Modal show={modalOpen} onClose={() => setModalOpen(false)}>
        <Modal.Header>{t('FAQs')}</Modal.Header>
        <Modal.Body>
          <Accordion>
            {FAQs.map((faq, index) => (
              <Accordion.Panel key={index}>
                <Accordion.Title>
                  {faq.question}
                </Accordion.Title>
                <Accordion.Content>
                  <p>{faq.answer}</p>
                </Accordion.Content>
              </Accordion.Panel>
            ))}
          </Accordion>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setModalOpen(false)} color="gray">
            {t('Close')}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const WalletBalance = ({ balance, onAddMoney }) => {
  const t = useTranslator();

  const currency = 'TRY';
  const currencyPosition = 'after';

  const amounts = [20, 50, 100, 200, 250, 500];

  // Function to format the amount based on currency position
  const formatCurrency = (amount) => {
    return currencyPosition === 'before' ? `${currency} ${amount}` : `${amount} ${currency}`;
  };

  return (
    <div className="w-full">
      <p className="text-lg font-bold">
        {t('Wallet')}: {formatCurrency(balance.toFixed(2))}
      </p>
      <div className="mt-2 grid grid-cols-3 gap-2"> {/* Change to grid layout */}
        {amounts.map((amount) => (
          <Button
            color="blue"
            key={amount}
            onClick={() => onAddMoney(amount)}
          >
            {formatCurrency(amount)}
          </Button>
        ))}
      </div>
    </div>
  );
};

export const Wallet = () => {
  const [balance, setBalance] = useState(100.00); // Initial wallet balance

  const addMoney = (amount) => {
    setBalance((prevBalance) => prevBalance + amount);
  };

  return (
    <div className="flex flex-col space-y-4">
      <ProgressBar target={10} current={3} reward={5} />
      <WalletBalance balance={balance} onAddMoney={addMoney} />
    </div>
  );
};
