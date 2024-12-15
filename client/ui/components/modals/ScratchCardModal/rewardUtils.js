export const getWeightedReward = () => {
  const weightedOptions = [
    {value: 0, weight: 2},
    {value: 1, weight: 44},
    {value: 2, weight: 40},
    {value: 3, weight: 10},
    {value: 4, weight: 2},
    {value: 5, weight: 2},
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

export const generateOtherNumbers = (reward) => {
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

export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
