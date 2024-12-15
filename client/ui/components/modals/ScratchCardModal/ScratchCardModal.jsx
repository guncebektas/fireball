import React, {useState} from 'react';
import {Modal} from 'flowbite-react';
import {useTranslator} from "../../../providers/i18n";
import {useScratchCardStore} from "../../../stores/useScratchCardStore";
import {useStampCountStore} from "../../../stores/useStampCountStore";
import {useConfettiStore} from "../../../stores/useConfettiStore";
import {getWeightedReward, generateOtherNumbers, shuffleArray} from "./rewardUtils";
import ScratchCardContent from "./ScratchCardContent";
import GameOverMessage from "./GameOverMessage";

const ScratchCardModal = () => {
  const t = useTranslator();

  const isQRCodeModalOpen = useScratchCardStore((state) => state.isScratchCardModalOpen);
  const closeQRCodeModal = useScratchCardStore((state) => state.closeScratchCardModal);

  const [canPlay, setCanPlay] = useState(true);
  const [gameOverMessage, setGameOverMessage] = useState('');

  const {stampCount= 0, increaseStampCount} = useStampCountStore();

  const openConfetti = useConfettiStore((state) => state.openConfetti);
  const closeConfetti = useConfettiStore((state) => state.closeConfetti);

  const [reward, setReward] = useState(getWeightedReward());

  const otherNumbers = generateOtherNumbers(reward);
  const allNumbers = [reward, reward, reward, otherNumbers[0], otherNumbers[0], otherNumbers[1]];
  const shuffledNumbers = shuffleArray([...allNumbers]);

  const handleComplete = async () => {
    if (reward === 0) {
      setGameOverMessage('No luck. Try again next week')
    } else {
      await increaseStampCount(reward);
      openConfetti();
      setGameOverMessage('Great. Try your luck again after a week');
    }

    setCanPlay(false);
  };

  return (
    <Modal dismissible show={isQRCodeModalOpen} onClose={closeQRCodeModal} size="md">
      <Modal.Header>
        {t('Scratch to win')}
      </Modal.Header>
      <Modal.Body>
        {canPlay ? (
          <ScratchCardContent shuffledNumbers={shuffledNumbers} handleComplete={handleComplete}/>
        ) : (
          <GameOverMessage message={gameOverMessage || 'You can try your luck once in every week'}/>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ScratchCardModal;
