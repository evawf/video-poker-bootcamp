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
// dealBtn.disabled = true;
// dealBtn.classList.add("deActiveBtn");

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
let score = 0;
let coins = 100;
let bet = 1;
let mode = "deal";

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
    const holdTextDiv = document.createElement("div");
    holdTextDiv.className = "holdTextDiv";
    cardDiv.appendChild(cardImg);
    cardDiv.appendChild(holdTextDiv);
    handDiv.appendChild(cardDiv);
  }
  pointDiv.innerText = coins;
};

// Handle Deal function
const displayHandAndHandleHold = (hand) => {
  //Display 5 cards' images
  const cardImgs = document.querySelectorAll(".card");
  const holdTextDiv = document.querySelectorAll(".holdTextDiv");
  for (let i = 0; i < cardImgs.length; i += 1) {
    cardImgs[i].src = `${hand[i].img}`;
  }

  for (let i = 0; i < hand.length; i += 1) {
    cardImgs[i].addEventListener("click", () => {
      holdTextDiv[i].innerText = "HOLD";
      hand[i]["hold"] = true;
      console.log(hand[i]);
    });
  }
  mode = "draw";
  dealBtn.innerText = "Draw";
};

// Select the bet - bet button event listener
const betBtns = document.querySelectorAll(".betBtn");
betBtns[0].classList.add("activeBtn");
for (let i = 1; i < betBtns.length; i += 1) {
  betBtns[i].addEventListener("click", () => {
    betBtns[0].classList.remove("activeBtn");
    betBtns[i].classList.add("activeBtn");
    bet = betBtns[i].innerText;
    // dealBtn.disabled = false;
    // dealBtn.classList.remove("deActiveBtn");
    // dealBtn.classList.add("activeBtn");
    for (let i = 0; i < betBtns.length; i += 1) {
      betBtns[i].disabled = true;
    }
  });
}

// Deal btn event listener
dealBtn.addEventListener("click", () => {
  if (mode === "deal") {
    coins -= bet;
    playerHand = [];
    // Add 5 cards to hand
    for (let i = 0; i < 5; i += 1) {
      if (newDeck.length === 0) {
        newDeck = shuffleCards(makeDeck());
      }
      playerHand.push(newDeck.pop());
    }
    displayHandAndHandleHold(playerHand);
    pointDiv.innerText = coins;
    // Disable Bet buttons
    const betBtns = document.querySelectorAll(".betBtn");
    for (let i = 0; i < betBtns.length; i += 1) {
      betBtns[i].disabled = true;
    }
  } else if (mode === "draw") {
    playerHand = playerHand.map((card) =>
      card["hold"] === true ? card : newDeck.pop()
    );
    console.log(playerHand);
    const cardImgs = document.querySelectorAll(".card");
    const holdTextDiv = document.querySelectorAll(".holdTextDiv");
    for (let i = 0; i < cardImgs.length; i += 1) {
      cardImgs[i].src = `${playerHand[i].img}`;
      holdTextDiv[i].innerText = "";
    }

    console.log(coins);
    score = calcHandScore(playerHand);
    console.log(score);
    console.log(bet);
    coins += score * bet;
    pointDiv.innerText = coins;

    mode = "deal";
    dealBtn.innerText = "Deal";
    // Enable Bet Buttons
    const betBtns = document.querySelectorAll(".betBtn");
    betBtns[0].classList.add("activeBtn");
    for (let i = 1; i < betBtns.length; i += 1) {
      betBtns[i].disabled = false;
      betBtns[i].classList.remove("activeBtn");
    }
  }
  return;
});

initGame();
