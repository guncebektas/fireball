import React, {useState} from 'react';
import {Modal} from 'flowbite-react';
import {useTranslator} from "../../../providers/i18n";
import {useScratchCardStore} from "../../../stores/useScratchCardStore";
import {useStampCountStore} from "../../../stores/useStampCountStore";
import {useConfettiStore} from "../../../stores/useConfettiStore";
import {generateOtherNumbers, getWeightedReward, shuffleArray} from "./rewardUtils";
import ScratchCardContent from "./ScratchCardContent";
import GameOverMessage from "./GameOverMessage";
import {useWalletData} from "../../../hooks/useWalletData";
import {userWalletMethod} from "../../../../../imports/modules/app/user/userWallet/userWalletMethod";
import {userProfileRepository} from "../../../../../imports/modules/app/user/userProfiles/userProfileRepository";
import {DateUtils} from "../../../../../imports/modules/shared/utils/DateUtils";
import {useTracker} from "meteor/react-meteor-data";
import {Meteor} from "meteor/meteor";
import {USER_PROFILE_PUBLICATION} from "../../../../../imports/modules/app/user/userProfiles/enums/publication";

const ScratchCardModal = () => {
  const t = useTranslator();

  const isScratchCardModalOpen = useScratchCardStore((state) => state.isScratchCardModalOpen);
  const closeScratchCardModal = useScratchCardStore((state) => state.closeScratchCardModal);

  const [canPlay, setCanPlay] = useState(true);
  const [gameOverMessage, setGameOverMessage] = useState('');
  const [gameOverReward, setGameOverReward] = useState(0);
  const [gameOverNextChanceAt, setGameOverNextChanceAt] = useState();

  const {increaseStampCount} = useStampCountStore();

  const openConfetti = useConfettiStore((state) => state.openConfetti);

  const [weightedReward] = useState(getWeightedReward());

  const otherNumbers = generateOtherNumbers(weightedReward);
  const allNumbers = [weightedReward, weightedReward, weightedReward, otherNumbers[0], otherNumbers[0], otherNumbers[1]];
  const shuffledNumbers = shuffleArray([...allNumbers]);

  const handleComplete = async () => {
    if (weightedReward === 0) {
      setGameOverMessage('No luck. Try again next week!');
      setGameOverReward(0)
    } else {
      await userWalletMethod.increaseCustomerStamp({amount: weightedReward})
        .then(async response => {
          openConfetti();
          setGameOverMessage('Great. Try your luck again after a week!');
          setGameOverReward(weightedReward);

          await increaseStampCount(weightedReward);
        })
        .catch(error => {
          console.error(error);
        })
    }

    setCanPlay(false);
  };

  let user;
  useTracker(() => {
    const subscription = Meteor.subscribe(USER_PROFILE_PUBLICATION.ME);
    if (subscription.ready()) {
      user = userProfileRepository.findOne({_id: Meteor.userId()}) || {};
      if (DateUtils.IsInLastWeek(user?.scratchedAt)) {
        setCanPlay(false);
        setGameOverNextChanceAt(DateUtils.AddSevenDays(user?.scratchedAt).toLocaleDateString());
      }
    }
  }, [user]);

  const {refreshWalletData} = useWalletData();

  const handleClose = () => {
    closeScratchCardModal();
    refreshWalletData();
  };

  return (
    <Modal dismissible show={isScratchCardModalOpen} onClose={handleClose} size="md">
      <Modal.Header>
        {t('Scratch to win')}
      </Modal.Header>
      <Modal.Body>
        {canPlay ? (
          <ScratchCardContent shuffledNumbers={shuffledNumbers} handleComplete={handleComplete}/>
        ) : (
          <GameOverMessage message={gameOverMessage || 'You can try your luck once in every week'} reward={gameOverReward} nextChanceAt={gameOverNextChanceAt}/>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ScratchCardModal;
