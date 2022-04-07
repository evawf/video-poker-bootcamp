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

const pointDiv = document.createElement("div");
pointDiv.className = "pointDiv";
pointDiv.innerText = "Coints";

const btnsDiv = document.createElement("div");
btnsDiv.className = "btnsDiv";
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
btn1.innerText = "1";
btn2.innerText = "2";
btn3.innerText = "3";
btn4.innerText = "4";
btn5.innerText = "5";

const dealBtn = document.createElement("button");
dealBtn.className = "dealBtn";
dealBtn.id = "dealBtn";
dealBtn.innerText = "Deal";

const mainContainer = document.querySelector(".container");

btnsDiv.append(pointDiv, btn1, btn2, btn3, btn4, btn5, dealBtn);
document.body.append(scoreBoardDiv, handDiv, btnsDiv);

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
        img: "imgs/" + `${cardName}` + "_of_" + `${currentSuit}` + ".png",
      };
      deck.push(card);
    }
  }
  return deck;
};

let newDeck = shuffleCards(makeDeck());

/*
=====================================
Game logic
=====================================
*/
let playerHand = [];
let coins = 100;
let bet = 1;

// Display cards back
for (let i = 0; i < 5; i += 1) {
  const cardImg = document.createElement("img");
  cardImg.id = `cardImg${i}`;
  cardImg.className = "card";
  cardImg.src = "imgs/cardback.svg";
  handDiv.appendChild(cardImg);
}

const isJackOrBetter = (hand, rankObj) => {
  if (numOfKeys !== 4) return false;
  for (let i = 0; i < hand.length; i += 1) {
    let key = hand[i].rank;
    if (rankObj[key] === 2 && (key >= 11 || key == 1)) {
      return true;
    }
  }
  return false;
};

// Check player hand point
const calcHandScore = (playerHand) => {
  // sort ranks
  let score = 0;
  let sortedRankObj = {};
  for (let idx = 0; idx < playerHand.length; idx += 1) {
    let rank = playerHand[idx].rank;
    if (rank in sortedRankObj) {
      sortedRankObj[rank] += 1;
    } else {
      sortedRankObj[rank] = 1;
    }
  }

  // check if hand is sequential
  let seq = isSequential(playerHand);
  // check if same suit
  let sameSuit = isSameSuit(playerHand);
  let numOfKeys = Object.keys(sortedRankObj).length;
  let key;

  console.log(sortedRankObj);
  // console.log(sameSuit);
  // console.log(seq);
  // console.log(playerHand);

  // Winning conditions:

  // Royal Flush - 250 * bet
  if (isRoyalFlush(playerHand, sortedRankObj)) return 250;

  // Straight Flush - 50 * bet
  if (isStraightFlush(playerHand, sortedRankObj)) return 50;

  // Four of a kind - 25 * bet
  if (isFour_of_a_kind(playerHand, sortedRankObj)) return 25;

  // Full House - 10 * bet
  if (isFullHouse(playerHand, sortedRankObj)) return 10;

  // Flush - 5 * bet
  if (isFlush(playerHand, sortedRankObj)) return 5;

  // Straight - 4 * bet
  if (isStraight(playerHand, sortedRankObj)) return 4;

  // Three of a kind - 3 * bet
  if (isThree_of_a_kind(playerHand, sortedRankObj)) return 3;

  // Two Pair - 2 * bet
  if (isTwoPair(playerHand, sortedRankObj)) return 2;

  // Jack or Better - 1 * bet
  if (isJackOrBetter(playerHand, sortedRankObj)) return 1;

  return 0;
};

// Handle Deal function
const handleDeal = (hand) => {
  //Display 5 cards' images
  const cardImgs = document.querySelectorAll(".card");
  for (let i = 0; i < cardImgs.length; i += 1) {
    cardImgs[i].src = `${hand[i].img}`;
  }

  //calculate the score based on current hand
  let score = calcHandScore(hand);
  console.log(score);
  let points = score * bet;
  return points;
};

// Deal btn event listener
dealBtn.addEventListener("click", () => {
  coins -= 1;
  playerHand = [];
  for (let i = 0; i < 5; i += 1) {
    if (newDeck.length === 0) {
      newDeck = shuffleCards(makeDeck());
    }
    playerHand.push(newDeck.pop());
  }
  let roundPoint = handleDeal(playerHand);
  console.log(roundPoint);
  console.log(coins);
});
