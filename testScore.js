// import { isSequential } from "isSeq.js";
// import { isSameSuit } from "isSameSuit.js";

let suits = {
  0: "spades",
  1: "hearts",
  2: "clubs",
  3: "diamonds",
};

let deck = [];

for (let i = 0; i < 4; i++) {
  for (let j = 0; j < 13; j++) {
    deck.push({
      name: `${j + 1}`,
      suits: suits[i],
      rank: j + 1,
    });
  }
}

function gc(rank, suit) {
  return deck[suit * 13 + rank - 1];
}

const isSameSuit = (playerHand) => {
  let sameSuit = true;
  let temp = playerHand[0].suit;
  for (let idx = 1; idx < playerHand.length; idx += 1) {
    if (playerHand[idx].suit !== temp) {
      sameSuit = false;
      break;
    }
  }
  return sameSuit;
};

const isSequential = (playerHand) => {
  playerHand.sort((a, b) => (a.rank > b.rank ? 1 : -1));
  let seq = true;
  let temp = playerHand[0].rank;
  for (let i = 1; i < playerHand.length; i += 1) {
    if (playerHand[i].rank - temp !== 1) {
      seq = false;
      break;
    } else {
      temp = playerHand[i].rank;
    }
  }

  let rankArr = [];
  for (let i = 1; i < playerHand.length; i += 1) {
    rankArr.push(playerHand[i].rank);
  }
  if (
    playerHand[0].rank === 1 &&
    Math.max(...rankArr) === 13 &&
    Math.min(...rankArr) === 10
  )
    seq = true;

  return seq;
};

// Check player hand point
const calcHandScore = (playerHand) => {
  // sort ranks
  let score = 0;
  let sortedRank = {};
  for (let idx = 0; idx < playerHand.length; idx += 1) {
    let rank = playerHand[idx].rank;
    if (rank in sortedRank) {
      sortedRank[rank] += 1;
    } else {
      sortedRank[rank] = 1;
    }
  }

  // check if hand is sequential
  let seq = isSequential(playerHand);
  // check if same suit
  let sameSuit = isSameSuit(playerHand);

  console.log(sortedRank);

  // Winning conditions:

  let numOfKeys = Object.keys(sortedRank).length;

  // console.log(seq);
  // console.log(sameSuit);
  // console.log(playerHand[playerHand.length - 1].rank);

  // Jack or Better - 1 * bet
  for (let i = 0; i < playerHand.length; i += 1) {
    let key = playerHand[i].rank;
    if (sortedRank[key] === 2 && key >= 11 && numOfKeys === 4) {
      score = 1;
      break;
    }
  }

  // Two Pair - 2 * bet
  let numOfPair = 0;
  for (let i = 0; i < playerHand.length - 1; i += 1) {
    let temp = playerHand[i].rank;
    for (let j = 1; j < playerHand.length; j += 1) {
      if (temp === playerHand[j].rank) {
        numOfPair += 1;
      }
    }
  }
  console.log(numOfPair);
  if (numOfPair === 2 && numOfKeys === 3) score = 2;

  // Three of a kind - 3 * bet
  for (let i = 0; i < playerHand.length; i += 1) {
    let key = playerHand[i].rank;
    if (sortedRank.key === 3) score = 3;
  }

  // Straight - 4 * bet
  if (seq === true && numOfKeys === 5) score = 4;

  // Flush - 5 * bet
  if (sameSuit === true && numOfKeys === 5) score = 5;

  // Full House - 10 * bet
  // console.log(numOfKeys);
  for (let i = 0; i < playerHand.length; i += 1) {
    let key = playerHand[i].rank;
    if (sortedRank.key === 3 && numOfKeys === 2) score = 10;
  }

  // Four of a kind - 25 * bet
  for (let i = 0; i < playerHand.length; i += 1) {
    let key = playerHand[i].rank;
    // console.log(key);
    if (sortedRank.key === 4) score = 25;
  }

  // Straight Flush - 50 * bet
  if (seq === true && sameSuit === true) score = 50;

  // Royal Flush - 250 * bet
  if (
    seq === true &&
    sameSuit === true &&
    playerHand[playerHand.length - 1].rank === 13 &&
    numOfKeys === 5
  ) {
    score = 250;
  }
  console.log(score);
  return score;
};

let testCases = [
  // {
  //   hand: [gc(12, 1), gc(11, 0), gc(10, 1), gc(13, 2), gc(13, 0)],
  //   expected: 1, // #1 one pair
  // },
  //{
  //  hand: [gc(6, 0), gc(6, 0), gc(3, 1), gc(4, 0), gc(3, 0)],
  //  expected: 2, // #2 two pair
  //},
  // {
  //   hand: [gc(10, 0), gc(10, 0), gc(3, 0), gc(10, 1), gc(5, 0)],
  //   expected: 3, // #3 triple
  // },
  // {
  //   hand: [gc(9, 2), gc(11, 0), gc(12, 3), gc(13, 1), gc(10, 0)],
  //   expected: 4, // #4 straight
  // },
  // {
  //   hand: [gc(6, 0), gc(9, 0), gc(8, 0), gc(6, 0), gc(10, 0)],
  //   expected: 5, // #5 flush
  // },
  // {
  //   hand: [gc(6, 0), gc(6, 2), gc(10, 0), gc(6, 0), gc(10, 1)],
  //   expected: 10, // #6 full house
  // },
  // {
  //   hand: [gc(6, 0), gc(6, 0), gc(6, 3), gc(6, 1), gc(10, 2)],
  //   expected: 25, // #7 four of a kind
  // },
  // {
  //   hand: [gc(1, 0), gc(3, 0), gc(2, 0), gc(5, 0), gc(4, 0)],
  //   expected: 50, // #8 Straight flush
  // },
  // {
  //   hand: [gc(10, 0), gc(11, 0), gc(1, 0), gc(13, 0), gc(12, 0)],
  //   expected: 250, // #9 Royal Flush
  // },
];

for (let i = 0; i < testCases.length; i++) {
  if (calcHandScore(testCases[i].hand) === testCases[i].expected) {
    console.log(`Test #${i + 1} success`);
  } else {
    console.log(`Test #${i + 1} failed`);
  }
}

function pairs(playerHand) {
  // Two Pair - 2 * bet
  let numOfPair = 0;
  for (let i = 0; i < playerHand.length - 1; i += 1) {
    let temp = playerHand[i].rank;
    for (let j = i + 1; j < playerHand.length; j += 1) {
      if (temp === playerHand[j].rank) {
        numOfPair += 1;
      }
    }
  }
  console.log(numOfPair);
  //if (numOfPair === 2 && numOfKeys === 3) score = 2;
}

//pairs([gc(6, 0), gc(6, 0), gc(3, 1), gc(4, 0), gc(3, 0)]);
pairs([gc(6, 0), gc(6, 1), gc(6, 2), gc(4, 0), gc(3, 0)]);

//cardByValue = {
//1:
//2:1
//3:
//4:
//5:
//6:
//7:
//8:
//9:
//10:2
//11:2
//12:
//13:
//}
function getCardsByValues(playerHand) {
  const cardByValue = {};
  for (let i = 0; i < playerHand; i++) {
    if (playerHand[i] in cardByValue) {
      cardByValue[playerHand[i]]++;
    } else {
      cardByValue[playerHand[i]] = 1;
    }
  }
  return cardByValue;
}

function isJackOrBetter(playerHand) {
  let cardByValue = getCardsByValues(playerHand);
  if (
    cardByValue[1] == 2 ||
    cardByValue[11] == 2 ||
    cardByValue[12] == 2 ||
    cardByValue[13] == 2
  ) {
    return true;
  }
  return false;
}

// if royalflush return
// if straight flush return
// if four of a kind return
// if full house return
// if flush return
// if straight return
// if 3 of a kind return
// 2 pairs return
// J or better return
// high card return
