const generateRandomNum = (max) => Math.floor(Math.random() * max + 1);

const shuffleCards = (cards) => {
  let randomNum = generateRandomNum();
  for (let i = 0; i < cards.length; i += 1) {
    let currentCard = cards[i];
    let randomCard = cards[randomNum];
    cards[i] = randomCard;
    cards[randomCard] = currentCard;
  }
  return cards;
};

const makeDeck = () => {};
