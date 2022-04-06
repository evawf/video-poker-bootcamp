/*
=====================================
Global variables
=====================================
*/
const scoreBoardDiv = document.createElement("div");
scoreBoardDiv.className = "scoreBoardDiv";
scoreBoardDiv.innerText = "Score Board";

const handDiv = document.createElement("div");
handDiv.className = "handDiv";
handDiv.innerText = "Hand";

const pointDiv = document.createElement("div");
pointDiv.className = "pointDiv";
pointDiv.innerText = "Coints";

const betBtnDiv = document.createElement("div");
betBtnDiv.className = "betBtnDiv";
const btn1 = document.createElement("button");
btn1.className = "betBtn";
const btn2 = document.createElement("button");
btn2.className = "betBtn";
const btn3 = document.createElement("button");
btn3.className = "betBtn";
const btn4 = document.createElement("button");
btn4.className = "betBtn";
const btn5 = document.createElement("button");
btn5.className = "betBtn";
btn1.innerText = "10";
btn2.innerText = "20";
btn3.innerText = "30";
btn4.innerText = "40";
btn5.innerText = "50";

betBtnDiv.append(btn1, btn2, btn3, btn4, btn5);

const dealBtn = document.createElement("div");
dealBtn.className = "dealBtn";
dealBtn.id = "dealBtn";
dealBtn.innerText = "Deal";

const mainContainer = document.querySelector(".container");
mainContainer.innerText = "Hello world!";
document.body.append(scoreBoardDiv, handDiv, betBtnDiv, dealBtn);

/*
=====================================
Shuffled Deck
=====================================
*/
const generateRandomNum = (max) => Math.floor(Math.random() * max);

const shuffleCards = (cards) => {
  for (let currentIndex = 0; currentIndex < cards.length; currentIndex += 1) {
    let randomNum = generateRandomNum(cards.length);
    let randomCard = cards[randomNum];
    let currentCard = cards[currentIndex];
    cards[currentIndex] = randomCard;
    cards[randomNum] = currentCard;
  }
  return cards;
};

const makeDeck = () => {
  let deck = [];
  const suits = ["clubs", "diamonds", "hearts", "spades"];
  const suitsSymbol = ["♣︎", "♦︎", "♥︎", "♣︎"];
  for (let suitIdx = 0; suitIdx < suits.length; suitIdx += 1) {
    const currentSuit = suits[suitIdx];
    const currentSuitSymbol = suitsSymbol[suitIdx];
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      let cardName = `${rankCounter}`;
      if (cardName === "1") cardName = "ace";
      if (cardName === "11") cardName = "jack";
      if (cardName === "12") cardName = "queen";
      if (cardName === "13") cardName = "king";

      const card = {
        name: cardName,
        suit: currentSuit,
        suitsSymbol: currentSuitSymbol,
        rank: rankCounter,
      };
      deck.push(card);
    }
  }
  // console.log(deck);
  return deck;
};

const newDeck = shuffleCards(makeDeck());

/*
=====================================
Game logic
=====================================
*/
const playerHand = [];
let coins = 100;

for (let i = 0; i < 5; i += 1) {
  playerHand.push(newDeck.pop());
}

const calcHandScore = (playerHand) => {
  console.log(playerHand);
  let score = 0;

  return score;
};

// calcHandScore(playerHand);
