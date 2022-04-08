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
      suit: suits[i],
      rank: j + 1,
    });
  }
}

function gc(rank, suit) {
  return deck[suit * 13 + rank - 1];
}

let seq;
let sameSuit;

const isRoyalFlush = (RankObj) => {
  let keys = Object.keys(RankObj);
  if (
    RankObj[1] === 1 &&
    RankObj[10] === 1 &&
    RankObj[11] === 1 &&
    RankObj[12] &&
    RankObj[13] & sameSuit
  )
    return true;
  return false;
};

const isFour_of_a_kind = (RankObj) => {
  let keys = Object.keys(RankObj);
  // let numOfQuadruplets = 0;
  for (let i = 0; i < keys.length; i += 1) {
    if (RankObj[keys[i]] === 4) return true;
  }
  return false;
};

const isFullHouse = (RankObj) => {
  let keys = Object.keys(RankObj);
  let numOfPair = 0;
  let numOfTriplets = 0;
  for (let i = 0; i < keys.length; i += 1) {
    if (RankObj[keys[i]] === 2) numOfPair += 1;
    if (RankObj[keys[i]] === 3) numOfTriplets += 1;
  }
  if (numOfPair === 1 && numOfTriplets === 1) return true;
  return false;
};

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

const isThree_of_a_kind = (RankObj) => {
  // let numOfTriplets = 0;
  let keys = Object.keys(RankObj);
  for (let i = 0; i < keys.length; i += 1) {
    if (RankObj[keys[i]] === 3) return true;
    // numOfTriplets += 1;
  }
  // if (numOfTriplets === 1) return true;
  return false;
};

const isTwoPair = (RankObj) => {
  let numOfPair = 0;
  let keys = Object.keys(RankObj);
  for (let i = 0; i < keys.length; i += 1) {
    if (RankObj[keys[i]] === 2) numOfPair += 1;
  }
  if (numOfPair === 2) return true;
  return false;
};

const isJackOrBetter = (rankObj) => {
  if (rankObj[1] === 2) return true;
  if (rankObj[11] === 2) return true;
  if (rankObj[12] === 2) return true;
  if (rankObj[13] === 2) return true;
  return false;
};

// Check player hand point
const calcHandScore = (playerHand) => {
  // sort ranks
  // let score = 0;
  let sortedRankObj = {};
  for (let idx = 0; idx < playerHand.length; idx += 1) {
    let rank = playerHand[idx].rank;
    if (rank in sortedRankObj) {
      sortedRankObj[rank] += 1;
    } else {
      sortedRankObj[rank] = 1;
    }
  }

  console.log(sortedRankObj);

  // Winning conditions:
  // check if hand is sequential
  seq = isSequential(playerHand);
  // check if same suit
  sameSuit = isSameSuit(playerHand);
  // let numOfKeys = Object.keys(sortedRankObj).length;

  // // Royal Flush - 250 * bet
  if (isRoyalFlush(sortedRankObj)) return 250;
  // console.log(isRoyalFlush(sortedRankObj));

  // // Straight Flush - 50 * bet
  if (sameSuit && seq) return 50;

  // // Four of a kind - 25 * bet
  if (isFour_of_a_kind(sortedRankObj)) return 25;

  // // Full House - 10 * bet
  if (isFullHouse(sortedRankObj)) return 10;

  // Flush - 5 * bet
  if (sameSuit) return 5;

  // Straight - 4 * bet
  if (seq) return 4;

  // Three of a kind - 3 * bet
  if (isThree_of_a_kind(sortedRankObj)) return 3;

  // Two Pair - 2 * bet
  if (isTwoPair(sortedRankObj)) return 2;

  // Jack or Better - 1 * bet
  if (isJackOrBetter(sortedRankObj)) return 1;

  // console.log(score);
  return 0;
};

let testCases = [
  // {
  //   hand: [gc(12, 1), gc(11, 0), gc(10, 1), gc(13, 2), gc(13, 0)],
  //   expected: 1, // #1 one pair
  // },
  // {
  //   hand: [gc(1, 1), gc(1, 0), gc(10, 1), gc(3, 2), gc(13, 0)],
  //   expected: 1, // #1 one pair
  // },
  // {
  //   hand: [gc(12, 1), gc(12, 0), gc(10, 1), gc(11, 2), gc(13, 0)],
  //   expected: 1, // #1 one pair
  // },
  // {
  //   hand: [gc(11, 1), gc(11, 0), gc(10, 1), gc(6, 2), gc(13, 0)],
  //   expected: 1, // #1 one pair
  // },
  // /*=========================================================================== */
  // {
  //   hand: [gc(1, 1), gc(11, 0), gc(10, 1), gc(6, 2), gc(13, 0)],
  //   expected: 0, // #1 Hight card
  // },
  // /*=========================================================================== */
  // {
  //   hand: [gc(6, 0), gc(6, 0), gc(3, 1), gc(4, 2), gc(3, 0)],
  //   expected: 2, // #2 two pair
  // },
  // {
  //   hand: [gc(1, 0), gc(1, 0), gc(3, 1), gc(4, 3), gc(3, 0)],
  //   expected: 2, // #2 two pair
  // },
  // {
  //   hand: [gc(13, 2), gc(6, 0), gc(13, 1), gc(4, 0), gc(6, 0)],
  //   expected: 2, // #2 two pair
  // },
  // {
  //   hand: [gc(6, 0), gc(2, 0), gc(3, 1), gc(6, 0), gc(3, 0)],
  //   expected: 2, // #2 one pair
  // },
  // /*=========================================================================== */
  // {
  //   hand: [gc(10, 0), gc(10, 0), gc(3, 0), gc(10, 1), gc(5, 0)],
  //   expected: 3, // #3 triple
  // },
  // {
  //   hand: [gc(1, 0), gc(1, 0), gc(3, 0), gc(1, 1), gc(5, 0)],
  //   expected: 3, // #3 triple
  // },
  // {
  //   hand: [gc(10, 0), gc(3, 0), gc(3, 0), gc(10, 1), gc(3, 0)],
  //   expected: 3, // #3 triple
  // },
  // {
  //   hand: [gc(10, 0), gc(1, 0), gc(3, 0), gc(1, 1), gc(1, 0)],
  //   expected: 3, // #3 triple
  // },
  // /*=========================================================================== */
  // {
  //   hand: [gc(13, 2), gc(11, 0), gc(12, 3), gc(1, 1), gc(10, 0)],
  //   expected: 4, // #4 straight
  // },
  // {
  //   hand: [gc(1, 2), gc(4, 0), gc(2, 3), gc(3, 1), gc(5, 0)],
  //   expected: 4, // #4 straight
  // },
  // {
  //   hand: [gc(8, 2), gc(6, 0), gc(9, 3), gc(7, 1), gc(5, 0)],
  //   expected: 4, // #4 straight
  // },
  // {
  //   hand: [gc(10, 2), gc(11, 0), gc(5, 3), gc(13, 1), gc(1, 0)],
  //   expected: 0, // #4 straight
  // },
  /*=========================================================================== */
  // {
  //   hand: [gc(6, 0), gc(9, 0), gc(8, 0), gc(6, 0), gc(10, 0)],
  //   expected: 5, // #5 flush
  // },
  // {
  //   hand: [gc(6, 1), gc(9, 1), gc(8, 1), gc(6, 1), gc(10, 1)],
  //   expected: 5, // #5 flush
  // },
  // {
  //   hand: [gc(6, 2), gc(9, 2), gc(8, 2), gc(6, 2), gc(10, 2)],
  //   expected: 5, // #5 flush
  // },
  // {
  //   hand: [gc(6, 3), gc(9, 3), gc(8, 3), gc(6, 3), gc(10, 3)],
  //   expected: 5, // #5 flush
  // },
  /*=========================================================================== */
  // {
  //   hand: [gc(6, 0), gc(6, 2), gc(10, 0), gc(6, 0), gc(10, 1)],
  //   expected: 10, // #6 full house
  // },
  // {
  //   hand: [gc(2, 0), gc(2, 2), gc(9, 0), gc(9, 0), gc(9, 1)],
  //   expected: 10, // #6 full house
  // },
  // {
  //   hand: [gc(1, 0), gc(1, 2), gc(1, 0), gc(6, 0), gc(10, 1)],
  //   expected: 3, // #6 full house
  // },
  // {
  //   hand: [gc(4, 0), gc(4, 2), gc(10, 0), gc(4, 0), gc(10, 1)],
  //   expected: 10, // #6 full house
  // },
  /*=========================================================================== */
  // {
  //   hand: [gc(6, 0), gc(6, 0), gc(6, 3), gc(6, 1), gc(10, 2)],
  //   expected: 25, // #7 four of a kind
  // },
  // {
  //   hand: [gc(1, 0), gc(1, 0), gc(1, 3), gc(1, 1), gc(10, 2)],
  //   expected: 25, // #7 four of a kind
  // },
  // {
  //   hand: [gc(12, 0), gc(6, 0), gc(12, 3), gc(12, 1), gc(12, 2)],
  //   expected: 25, // #7 four of a kind
  // },
  // {
  //   hand: [gc(2, 0), gc(6, 0), gc(2, 3), gc(2, 1), gc(10, 2)],
  //   expected: 3, // #7 four of a kind
  // },
  /*=========================================================================== */
  // {
  //   hand: [gc(1, 0), gc(3, 0), gc(2, 0), gc(5, 0), gc(4, 0)],
  //   expected: 50, // #8 Straight flush
  // },
  // {
  //   hand: [gc(1, 2), gc(13, 2), gc(12, 2), gc(10, 2), gc(11, 2)],
  //   expected: 50, // #8 Straight flush
  // },
  // {
  //   hand: [gc(7, 3), gc(6, 3), gc(8, 3), gc(9, 3), gc(5, 3)],
  //   expected: 50, // #8 Straight flush
  // },
  // {
  //   hand: [gc(1, 2), gc(3, 0), gc(2, 3), gc(5, 0), gc(4, 0)],
  //   expected: 4, // straight
  // },
  /*=========================================================================== */
  {
    hand: [gc(10, 0), gc(11, 0), gc(1, 0), gc(13, 0), gc(12, 0)],
    expected: 250, // #9 Royal Flush
  },
  {
    hand: [gc(1, 1), gc(11, 0), gc(10, 1), gc(13, 1), gc(12, 1)],
    expected: 4, // #9 Royal Flush
  },
  {
    hand: [gc(12, 2), gc(11, 2), gc(10, 2), gc(13, 2), gc(1, 2)],
    expected: 250, // #9 Royal Flush
  },
  {
    hand: [gc(10, 3), gc(11, 3), gc(13, 3), gc(1, 3), gc(12, 3)],
    expected: 250, // #9 Royal Flush
  },

  {
    hand: [gc(10, 2), gc(11, 0), gc(5, 3), gc(13, 1), gc(1, 0)],
    expected: 0, // high cards
  },
];

for (let i = 0; i < testCases.length; i++) {
  console.log(calcHandScore(testCases[i].hand));
  if (calcHandScore(testCases[i].hand) === testCases[i].expected) {
    console.log(`Test #${i + 1} success`);
  } else {
    console.log(`Test #${i + 1} failed`);
  }
}

// function pairs(playerHand) {
//   // Two Pair - 2 * bet
//   let numOfPair = 0;
//   for (let i = 0; i < playerHand.length - 1; i += 1) {
//     let temp = playerHand[i].rank;
//     for (let j = i + 1; j < playerHand.length; j += 1) {
//       if (temp === playerHand[j].rank) {
//         numOfPair += 1;
//       }
//     }
//   }
//   console.log(numOfPair);
//   //if (numOfPair === 2 && numOfKeys === 3) score = 2;
// }

//pairs([gc(6, 0), gc(6, 0), gc(3, 1), gc(4, 0), gc(3, 0)]);
// pairs([gc(6, 0), gc(6, 1), gc(6, 2), gc(4, 0), gc(3, 0)]);

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

// function getCardsByValues(playerHand) {
//   const cardByValue = {};
//   for (let i = 0; i < playerHand; i++) {
//     if (playerHand[i] in cardByValue) {
//       cardByValue[playerHand[i]]++;
//     } else {
//       cardByValue[playerHand[i]] = 1;
//     }
//   }
//   return cardByValue;
// }

// function isJackOrBetter(playerHand) {
//   let cardByValue = getCardsByValues(playerHand);
//   if (
//     cardByValue[1] == 2 ||
//     cardByValue[11] == 2 ||
//     cardByValue[12] == 2 ||
//     cardByValue[13] == 2
//   ) {
//     return true;
//   }
//   return false;
// }

// function isTwoPairs(playerHand) {
//   let cardByValue = getCardsByValues(playerHand);
//   let numberOfPair = 0;
//   let keys = Object.keys(cardByValue);
//   for (let i = 0; i < keys.length; i++) {
//     if (cardByValue[keys[i]] == 2) {
//       numberOfPair++;
//     }
//   }
//   if (numberOfPair === 2) return true;
//   return false;
// }

// function isFullHouse(playerHand) {
//   let cardByValue = getCardsByValues(playerHand);
//   let numberOfPair = 0;
//   let numberOf3OfAKind = 0;
//   let keys = Object.keys(cardByValue);
//   for (let i = 0; i < keys.length; i++) {
//     if (cardByValue[keys[i]] == 2) {
//       numberOfPair++;
//     }
//     if (cardByValue[keys[i]] == 3) {
//       numberOf3OfAKind++;
//     }
//   }
//   if (numberOfPair === 1 && numberOf3OfAKind === 1) return true;
//   return false;
// }

// function isJackOrBetter(playerHand) {
//   let cardByValue = getCardsByValues(playerHand);
//   let numberOfPair = 0;
//   let pairValue = -1;
//   // ace is 14
//   let keys = Object.keys(cardByValue);
//   for (let i = 0; i < keys.length; i++) {
//     if (cardByValue[key[i]] == 2) {
//       numberOfPair++;
//       let currentValue = key[i];
//       if (currentValue === 1) currentValue = 14;
//       if (currentValue > pairValue) pairValue = currentValue;
//     }
//   }
//   if (numberOfPair === 1 && pairValue >= 11) return true;
//   return false;
// }
