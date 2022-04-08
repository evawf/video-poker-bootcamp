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
// pointDiv.innerText = "Coints";

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
dealBtn.disabled = true;
dealBtn.classList.add("deActiveBtn");

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
let playerHand;
let coins = 100;
let bet = 0;

const initGame = () => {
  // Display cards back
  for (let i = 0; i < 5; i += 1) {
    const cardDiv = document.createElement("div");
    cardDiv.className = "cardDiv";
    const cardImg = document.createElement("img");
    cardImg.id = `cardImg${i}`;
    cardImg.className = "card";
    // cardImg.src = "imgs/cardback.svg";
    cardImg.src = "imgs/Bull-Dog-Squeezers-Red.png";
    cardDiv.appendChild(cardImg);
    handDiv.appendChild(cardDiv);
  }
  pointDiv.innerText = coins;
};

// Handle Deal function
const handleDeal = (hand) => {
  // console.log(hand);
  //Display 5 cards' images

  const cardImgs = document.querySelectorAll(".card");
  for (let i = 0; i < cardImgs.length; i += 1) {
    cardImgs[i].src = `${hand[i].img}`;
  }

  const cardDivs = document.querySelectorAll(".cardDiv");
  for (let i = 0; i < hand.length; i += 1) {
    cardImgs[i].addEventListener("click", () => {
      const textDiv = document.createElement("div");
      textDiv.innerText = "HOLD";
      cardDivs[i].appendChild(textDiv);
    });
  }

  //calculate the score based on current hand
  let score = calcHandScore(hand);
  let points = score * bet;
  return points;
};

// Select the bet - bet button event listener
const betBtns = document.querySelectorAll(".betBtn");
for (let i = 0; i < betBtns.length; i += 1) {
  betBtns[i].addEventListener("click", () => {
    betBtns[i].classList.add("activeBtn");
    bet = betBtns[i].innerText;
    dealBtn.disabled = false;
    dealBtn.classList.remove("deActiveBtn");
    dealBtn.classList.add("activeBtn");
  });
}

// Deal btn event listener
dealBtn.addEventListener("click", () => {
  coins -= bet;
  playerHand = [];

  // Add 5 cards to hand
  for (let i = 0; i < 5; i += 1) {
    if (newDeck.length === 0) {
      newDeck = shuffleCards(makeDeck());
    }
    playerHand.push(newDeck.pop());
  }
  console.log(playerHand);

  let roundPoint = handleDeal(playerHand);
  console.log(roundPoint);
  coins += roundPoint;
  console.log(coins);
  pointDiv.innerText = coins;
});

// Select the cards to hold then draw new cards to replace the rest

// debugger;
initGame();
