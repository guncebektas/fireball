import React, {useState} from 'react';
import {ScratchCard} from 'next-scratchcard';
import {Modal, Table} from 'flowbite-react';
import {useTranslator} from "../../providers/i18n";
import {WalletIcon} from "../../pages/wallet/WalletIcon";
import {useScratchCardStore} from "../../stores/useScratchCardStore";

const ScratchCardModal = () => {
  const t = useTranslator();

  const isQRCodeModalOpen = useScratchCardStore((state) => state.isScratchCardModalOpen);
  const closeQRCodeModal = useScratchCardStore((state) => state.closeScratchCardModal);

  const [canPlay, setCanPlay] = useState(true);

  // Weighted random selection for reward
  const getWeightedReward = () => {
    const weightedOptions = [
      { value: 0, weight: 10 }, // %10 chance for 0
      { value: 1, weight: 40 }, // %40 chance for 1
      { value: 2, weight: 40 }, // %40 chance for 2
      { value: 3, weight: 7 },  // %7 chance for 3
      { value: 4, weight: 2 },  // %2 chance for 4
      { value: 5, weight: 1 },  // %1 chance for 5
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

  // Helper function to generate random numbers
  const generateOtherNumbers = (reward) => {
    const numbers = [];

    // Upper bound number
    let upper = reward + 2;
    // Lower bound number
    let lower = Math.max(0, reward - 2);

    // Generate two random numbers
    while (numbers.length < 2) {
      const num = Math.floor(Math.random() * (upper - lower + 1)) + lower;
      if (num !== reward && !numbers.includes(num)) {
        numbers.push(num);
      }
    }

    return numbers;
  };

  const otherNumbers = generateOtherNumbers(reward);

  // Combine the numbers into one array with 3 rewards, 2 otherNumbers[0], and 1 otherNumbers[1]
  const allNumbers = [
    reward, reward, reward,
    otherNumbers[0], otherNumbers[0],
    otherNumbers[1]
  ];

  // Shuffle the array to make the order random
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  };

  const shuffledNumbers = shuffleArray([...allNumbers]); // Shuffle the numbers array

  const handleComplete = () => {
    if (reward === 0) {
      alert(`No luck. Try again next time!`);
    } else {
      alert(`Congratulations! You have finished scratching and won ${reward}`);
    }
  };

  return (
    <Modal show={isQRCodeModalOpen} onClose={closeQRCodeModal} size="md" >
      <Modal.Header>
        {t('Scratch to win')}
      </Modal.Header>
      <Modal.Body className={'p-2'}>
        <div className="scratch-card">
          <span className="scratch-card-content">
            {canPlay ?
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
                    {/* First row */}
                    <Table.Row>
                      <Table.Cell className="py-2 px-4">{shuffledNumbers[0]} <WalletIcon/></Table.Cell>
                      <Table.Cell className="py-2 px-4">{shuffledNumbers[1]} <WalletIcon/></Table.Cell>
                    </Table.Row>
                    {/* Second row */}
                    <Table.Row>
                      <Table.Cell className="py-2 px-4">{shuffledNumbers[2]} <WalletIcon/></Table.Cell>
                      <Table.Cell className="py-2 px-4">{shuffledNumbers[3]} <WalletIcon/></Table.Cell>
                    </Table.Row>
                    {/* Third row */}
                    <Table.Row>
                      <Table.Cell className="py-2 px-4">{shuffledNumbers[4]} <WalletIcon/></Table.Cell>
                      <Table.Cell className="py-2 px-4">{shuffledNumbers[5]} <WalletIcon/></Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </ScratchCard>
              :
              <div className="scratch-card-wait-to-play">
                <p>{t('You can try your luck again on Friday')}.</p>
              </div>
            }
          </span>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ScratchCardModal;
