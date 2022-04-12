/*
=====================================
Global variables
=====================================
*/
let playerHand;
let score = 0;
let coins = 100;
let bet = 1;
let mode = "deal";

const msgBoardDiv = document.createElement("div");
msgBoardDiv.className = "msgBoardDiv";
msgBoardDiv.innerText = "Tap Deal to play";

const handDiv = document.createElement("div");
handDiv.className = "handDiv";

const coinImgDiv = document.createElement("div");
coinImgDiv.className = "coinImgDiv";
const pointDiv = document.createElement("div");
pointDiv.className = "pointDiv";

const coinContainer = document.createElement("div");
coinContainer.className = "coinContainer";
coinContainer.append(coinImgDiv, pointDiv);

const btnsDiv = document.createElement("div");
const betBtnContainer = document.createElement("div");
betBtnContainer.className = "betBtnContainer";
btnsDiv.className = "btnsDiv";
btnsDiv.append(coinContainer);
for (let i = 0; i < 5; i += 1) {
  const btn = document.createElement("button");
  btn.className = "betBtn";
  btn.id = `betBtn${i}`;
  btn.innerText = i + 1;
  betBtnContainer.append(btn);
}
btnsDiv.append(betBtnContainer);

const dealBtn = document.createElement("button");
dealBtn.className = "dealBtn";
dealBtn.id = "dealBtn";
dealBtn.innerText = "Deal";

btnsDiv.append(dealBtn);
const containerDiv = document.querySelector(".container");
containerDiv.append(msgBoardDiv, handDiv, btnsDiv);

// Animation Div
const animationDiv = document.createElement("div");
containerDiv.appendChild(animationDiv);
animationDiv.className = "animationDiv";
animationDiv.style = "postion:absolute; ";

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

const initGame = () => {
  // Display cards back
  for (let i = 0; i < 5; i += 1) {
    const cardDiv = document.createElement("div");
    cardDiv.className = "cardDiv";
    const cardImg = document.createElement("img");
    cardImg.id = `cardImg${i}`;
    cardImg.className = "card";
    cardImg.src = "imgs/Bull-Dog-Squeezers-Red.png";
    const holdImg = document.createElement("img");
    holdImg.className = "holdImg";
    cardDiv.appendChild(cardImg);
    cardDiv.appendChild(holdImg);
    handDiv.appendChild(cardDiv);
  }
  pointDiv.innerText = coins;
};

const toggleHold = (event) => {
  const cardElement = event.target;
  const index = cardElement.dataset.id;
  const holdImg = document.querySelectorAll(".holdImg");
  // const cardDivs = document.querySelectorAll(".cardDiv");
  if (playerHand[index]["hold"] === true) {
    holdImg[index].src = "";
    playerHand[index]["hold"] = false;
  } else {
    holdImg[index].src = "imgs/hold.png";
    playerHand[index]["hold"] = true;
  }
};

const holdCard = () => {
  const cardImgs = document.querySelectorAll(".card");
  for (let i = 0; i < playerHand.length; i += 1) {
    cardImgs[i].addEventListener("click", toggleHold);
  }
};

// Handle Deal function
const displayHand = () => {
  //Display 5 cards' images
  const cardImgs = document.querySelectorAll(".card");
  for (let i = 0; i < cardImgs.length; i += 1) {
    cardImgs[i].src = `${playerHand[i].img}`;
    cardImgs[i].dataset.id = i;
  }
  holdCard();
  mode = "draw";
  dealBtn.innerText = "Draw";
  msgBoardDiv.innerText = "Click cards to HOLD";
};

const betBtns = document.querySelectorAll(".betBtn");
betBtns[0].classList.add("activeBtn");
let activeBtn;
betBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let clickedBtn = e.currentTarget;
    clickedBtn.classList.add("activeBtn");
    bet = clickedBtn.innerText;
    console.log(bet);
    console.log(clickedBtn);
    for (let i = 0; i < betBtns.length; i += 1) {
      if (betBtns[i] !== clickedBtn) {
        console.log(activeBtn);
        betBtns[i].classList.remove("activeBtn");
      }
    }
    activeBtn = clickedBtn;
  });
});

const disableAllBetBtns = () => {
  for (let i = 0; i < betBtns.length; i += 1) {
    betBtns[i].disabled = true;
    // betBtns[i].style = "background-color: gray";
  }
};

const enableAllBetBtns = () => {
  for (let i = 0; i < betBtns.length; i += 1) {
    betBtns[i].disabled = false;
    betBtns[i].style = "filter: blur(0px)";
    betBtns[i].classList.remove("activeBtn");
  }
};

// Select the bet - bet button event listener
// for (let i = 0; i < betBtns.length; i += 1) {
//   betBtns[0].classList.add("activeBtn");
//   betBtns[i].addEventListener("click", () => {
//     bet = betBtns[i].innerText;
//     console.log(bet);
//     betBtns[i].classList.add("activeBtn");
//     betBtns[0].classList.remove("activeBtn");
//     // disableAllBetBtns();
//   });
// }

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
    displayHand(playerHand);
    pointDiv.innerText = coins;
    // // Disable Bet buttons
    disableAllBetBtns();
    // const betBtns = document.querySelectorAll(".betBtn");
    // for (let i = 0; i < betBtns.length; i += 1) {
    //   betBtns[i].disabled = true;
    // }
  } else if (mode === "draw") {
    playerHand = playerHand.map((card) =>
      card["hold"] === true ? card : newDeck.pop()
    );
    const cardImgs = document.querySelectorAll(".card");
    const holdImg = document.querySelectorAll(".holdImg");
    for (let i = 0; i < cardImgs.length; i += 1) {
      cardImgs[i].src = `${playerHand[i].img}`;
      holdImg[i].src = "";
      cardImgs[i].removeEventListener("click", toggleHold);
    }

    score = calcHandScore(playerHand);
    coins += score * bet;
    pointDiv.innerText = coins;
    mode = "deal";
    dealBtn.innerText = "Deal";
    if (score === 0) {
      msgBoardDiv.innerText = "0 Point";
    } else if (score === 1) {
      msgBoardDiv.innerText = `Jack or Better: + ${score * bet} Points`;
    } else if (score === 2) {
      msgBoardDiv.innerText = `Two Pair: + ${score * bet} Points`;
    } else if (score === 3) {
      msgBoardDiv.innerText = `Three of a Kind: + ${score * bet} Points`;
    } else if (score === 4) {
      msgBoardDiv.innerText = `Straight: + ${score * bet} Points`;
    } else if (score === 5) {
      msgBoardDiv.innerText = `Flush: + ${score * bet} Points`;
    } else if (score === 10) {
      msgBoardDiv.innerText = `Full House: + ${score * bet} Points`;
    } else if (score === 25) {
      msgBoardDiv.innerText = `Four of a Kind: + ${score * bet} Points`;
    } else if (score === 50) {
      msgBoardDiv.innerText = `Straight Flush: + ${score * bet} Points`;
    } else if (score === 250) {
      msgBoardDiv.innerText = `Royal Flush: + ${score * bet} Points`;
    }

    // Enable Bet Buttons
    enableAllBetBtns();
    betBtns[0].classList.add("activeBtn");
    // const betBtns = document.querySelectorAll(".betBtn");
    // betBtns[0].classList.add("activeBtn");
    // for (let i = 1; i < betBtns.length; i += 1) {
    //   betBtns[i].disabled = false;
    //   betBtns[i].classList.remove("activeBtn");
    // }
  }
  return;
});

// Audio Control Function
const music = document.getElementById("music");
const musicBtn = document.getElementById("playMusic");
let isPlaying = false;
const toggleMusic = () => {
  if (isPlaying === false) {
    music.play();
    music.loop = true;
    musicBtn.innerHTML = `<i class="fa fa-music"></i>`;
    isPlaying = true;
  } else {
    music.pause();
    musicBtn.innerHTML = `<i class="fa fa-pause"></i>`;
    isPlaying = false;
  }
};
musicBtn.addEventListener("click", toggleMusic);

initGame();
