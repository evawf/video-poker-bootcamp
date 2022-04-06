/*
=====================================
Global variables
=====================================
*/
const scoreBoardDiv = document.createElement("div");
scoreBoardDiv.className = "scoreBoardDiv";
scoreBoardDiv.innerText = "Score Board";

// winning conditions in scoreBoard - do later

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
btn1.innerText = "10";
btn2.innerText = "20";
btn3.innerText = "30";
btn4.innerText = "40";
btn5.innerText = "50";

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
  console.log(deck);
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
let sortedRank = {};
let sortedSuit = {};

// Deal cards
for (let i = 0; i < 5; i += 1) {
  if (newDeck.length === 0) {
    newDeck();
  }
  playerHand.push(newDeck.pop());
  const img = document.createElement("img");
  img.className = "card";
  img.src = "imgs/cardback.svg";
  handDiv.appendChild(img);
}

// Check player hand point
const calcHandScore = (playerHand) => {
  console.log(playerHand);
  // sort ranks
  for (let idx = 0; idx < playerHand.length; idx += 1) {
    let name = playerHand[idx].name;
    if (name in sortedRank) {
      sortedRank[name] += 1;
    } else {
      sortedRank[name] = 1;
    }
  }

  // sort suits
  for (let idx = 0; idx < playerHand.length; idx += 1) {
    let suit = playerHand[idx].suit;
    if (suit in sortedSuit) {
      sortedSuit[suit] += 1;
    } else {
      sortedSuit[suit] = 1;
    }
  }

  // let playerHand = [
  // {
  //     name: "5",
  //     suit: "clubs",
  //     suitsSymbol: "♣︎",
  //     rank: 5,
  //     img: "imgs/5_of_clubs.png",
  //   },
  //   {
  //     name: "7",
  //     suit: "clubs",
  //     suitsSymbol: "♣︎",
  //     rank: 7,
  //     img: "imgs/7_of_clubs.png",
  // },
  //   {
  //     name: "6",
  //     suit: "hearts",
  //     suitsSymbol: "♥︎",
  //     rank: 6,
  //     img: "imgs/6_of_hearts.png",
  //   },
  //   {
  //     name: "3",
  //     suit: "diamonds",
  //     suitsSymbol: "♦︎",
  //     rank: 3,
  //     img: "imgs/3_of_diamonds.png",
  //   },
  //   {
  //     name: "4",
  //     suit: "hearts",
  //     suitsSymbol: "♥︎",
  //     rank: 4,
  //     img: "imgs/4_of_hearts.png",
  //   },
  //   {
  //     name: "jack",
  //     suit: "hearts",
  //     suitsSymbol: "♥︎",
  //     rank: 11,
  //     img: "imgs/jack_of_hearts.png",
  //   },
  //   {
  //     name: "7",
  //     suit: "clubs",
  //     suitsSymbol: "♣︎",
  //     rank: 7,
  //     img: "imgs/7_of_clubs.png",
  //   },
  // ];

  // check if hand is sequential
  let isSequential = false;
  playerHand.sort((a, b) => (a.rank > b.rank ? 1 : -1));
  console.log(playerHand);
  playerHand[0].rank + 4 === playerHand[4].rank
    ? (isSequential = true)
    : (isSequential = false);

  console.log(isSequential);

  // console.log(sortedRank);
  // console.log(sortedSuit);

  let score = 0;

  return score;
};

calcHandScore(playerHand);
