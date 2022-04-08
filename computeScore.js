// Check if royal flush
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

// Check if four of a kind
const isFour_of_a_kind = (RankObj) => {
  let keys = Object.keys(RankObj);
  // let numOfQuadruplets = 0;
  for (let i = 0; i < keys.length; i += 1) {
    if (RankObj[keys[i]] === 4) return true;
  }
  return false;
};

// Check if full house
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

// Check if flush - same suit
const isSameSuit = (crtHand) => {
  let sameSuit = true;
  let temp = crtHand[0].suit;
  for (let idx = 1; idx < crtHand.length; idx += 1) {
    if (crtHand[idx].suit !== temp) {
      sameSuit = false;
      break;
    }
  }
  return sameSuit;
};

// Check if straight - sequential
const isSequential = (crtHand) => {
  crtHand.sort((a, b) => (a.rank > b.rank ? 1 : -1));
  let seq = true;
  let temp = crtHand[0].rank;
  for (let i = 1; i < crtHand.length; i += 1) {
    if (crtHand[i].rank - temp !== 1) {
      seq = false;
      break;
    } else {
      temp = crtHand[i].rank;
    }
  }

  let rankArr = [];
  for (let i = 1; i < crtHand.length; i += 1) {
    rankArr.push(crtHand[i].rank);
  }
  if (
    crtHand[0].rank === 1 &&
    Math.max(...rankArr) === 13 &&
    Math.min(...rankArr) === 10
  )
    seq = true;

  return seq;
};

// Check if three of a kind
const isThree_of_a_kind = (RankObj) => {
  let numOfTriplets = 0;
  let keys = Object.keys(RankObj);
  for (let i = 0; i < keys.length; i += 1) {
    if (RankObj[keys[i]] === 3) return true;
    // numOfTriplets += 1;
  }
  // if (numOfTriplets === 1) return true;
  return false;
};

// Check if two pair
const isTwoPair = (RankObj) => {
  let numOfPair = 0;
  let keys = Object.keys(RankObj);
  for (let i = 0; i < keys.length; i += 1) {
    if (RankObj[keys[i]] === 2) numOfPair += 1;
  }
  if (numOfPair === 2) return true;
  return false;
};

// S1 - check if Jack or Better
// const isJackOrBetter = (hand, rankObj) => {
//   if (numOfKeys !== 4) return false;
//   for (let i = 0; i < hand.length; i += 1) {
//     let key = hand[i].rank;
//     if (rankObj[key] === 2 && (key >= 11 || key == 1)) {
//       return true;
//     }
//   }
//   return false;
// };

// S2 - Jack or Better
const isJackOrBetter = (rankObj) => {
  if (rankObj[1] === 2) return true;
  if (rankObj[11] === 2) return true;
  if (rankObj[12] === 2) return true;
  if (rankObj[13] === 2) return true;
  return false;
};

// Check player hand point
const calcHandScore = (playerCrtHand) => {
  let sortedRankObj = {};
  for (let idx = 0; idx < playerCrtHand.length; idx += 1) {
    let rank = playerCrtHand[idx].rank;
    if (rank in sortedRankObj) {
      sortedRankObj[rank] += 1;
    } else {
      sortedRankObj[rank] = 1;
    }
  }

  // check if hand is sequential
  let seq = isSequential(playerCrtHand);
  let sameSuit = isSameSuit(playerCrtHand);
  // let numOfKeys = Object.keys(sortedRankObj).length;

  // Royal Flush - 250 * bet
  if (isRoyalFlush(sortedRankObj)) return 250;

  // Straight Flush - 50 * bet
  if (sameSuit && seq) return 50;

  // Four of a kind - 25 * bet
  if (isFour_of_a_kind(sortedRankObj)) return 25;

  // Full House - 10 * bet
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

  return 0;
};
