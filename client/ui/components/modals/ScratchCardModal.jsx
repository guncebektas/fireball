import React, {useState} from 'react';
import {ScratchCard} from 'next-scratchcard';
import {Modal, Table} from 'flowbite-react';
import {useTranslator} from "../../providers/i18n";
import {WalletIcon} from "../../pages/wallet/WalletIcon";
import {useScratchCardStore} from "../../stores/useScratchCardStore";
import {useStampCount} from "../../stores/useStampCount";
import {useConfettiStore} from "../../stores/useConfettiStore";
import {userWalletMethods} from "../../../../imports/modules/app/user/userWallet/userWallet.methods";

const ScratchCardModal = () => {
  const t = useTranslator();

  const isQRCodeModalOpen = useScratchCardStore((state) => state.isScratchCardModalOpen);
  const closeQRCodeModal = useScratchCardStore((state) => state.closeScratchCardModal);

  const [canPlay, setCanPlay] = useState(true);
  const {stampCount, increaseStampCount} = useStampCount();

  const openConfetti = useConfettiStore((state) => state.openConfetti);
  const closeConfetti = useConfettiStore((state) => state.closeConfetti);

  const getWeightedReward = () => {
    const weightedOptions = [
      {value: 0, weight: 10},
      {value: 1, weight: 40},
      {value: 2, weight: 40},
      {value: 3, weight: 7},
      {value: 4, weight: 2},
      {value: 5, weight: 1},
    ];
    const totalWeight = weightedOptions.reduce((acc, option) => acc + option.weight, 0);
    const randomWeight = Math.random() * totalWeight;

    let cumulativeWeight = 0;
    for (const option of weightedOptions) {
      cumulativeWeight += option.weight;
      if (randomWeight <= cumulativeWeight) {
        return option.value;
      }
    }
  };

  const [reward, setReward] = useState(getWeightedReward());

  const generateOtherNumbers = (reward) => {
    const numbers = [];
    let upper = reward + 2;
    let lower = Math.max(0, reward - 2);

    while (numbers.length < 2) {
      const num = Math.floor(Math.random() * (upper - lower + 1)) + lower;
      if (num !== reward && !numbers.includes(num)) {
        numbers.push(num);
      }
    }
    return numbers;
  };

  const otherNumbers = generateOtherNumbers(reward);
  const allNumbers = [reward, reward, reward, otherNumbers[0], otherNumbers[0], otherNumbers[1]];

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const shuffledNumbers = shuffleArray([...allNumbers]);

  const handleComplete = () => {
    if (reward === 0) {
      alert(`No luck. Try again next time!`);
    } else {
      userWalletMethods.increaseCustomerStamp({amount: reward});
      // increaseStampCount(reward); // because of week once condition we can't increase state
      closeQRCodeModal();

      openConfetti();
    }
  };

  return (
    <Modal show={isQRCodeModalOpen} onClose={closeQRCodeModal} size="md">
      <Modal.Header>
        {t('Scratch to win')}
      </Modal.Header>
      <Modal.Body className="p-2">
        <div className="scratch-card">
          <span className="scratch-card-content">
            {canPlay ? (
              <ScratchCard
                width={150}
                height={150}
                finishPercent={70}
                brushSize={35}
                onComplete={handleComplete}
              >
                <img
                  width={150}
                  height={150}
                  src={`https://via.placeholder.com/150x150`}
                  alt="Background"
                />
                <Table className="w-full scratch-card-reward-table">
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell className="py-2 px-4">{shuffledNumbers[0]} <WalletIcon/></Table.Cell>
                      <Table.Cell className="py-2 px-4">{shuffledNumbers[1]} <WalletIcon/></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell className="py-2 px-4">{shuffledNumbers[2]} <WalletIcon/></Table.Cell>
                      <Table.Cell className="py-2 px-4">{shuffledNumbers[3]} <WalletIcon/></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell className="py-2 px-4">{shuffledNumbers[4]} <WalletIcon/></Table.Cell>
                      <Table.Cell className="py-2 px-4">{shuffledNumbers[5]} <WalletIcon/></Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </ScratchCard>
            ) : (
              <div className="scratch-card-wait-to-play">
                <p>{t('You can try your luck again on Friday')}.</p>
              </div>
            )}
          </span>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ScratchCardModal;
