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
    playerHand[1].rank === 10 &&
    playerHand[2].rank === 11 &&
    playerHand[3].rank === 12 &&
    playerHand[4].rank === 13
  )
    seq = true;

  return seq;
};

let testCases = [
  {
    hand: [gc(10, 0), gc(1, 0), gc(11, 0), gc(11, 0), gc(13, 0)],
    expected: false,
  },
  {
    hand: [gc(10, 0), gc(1, 0), gc(10, 0), gc(11, 0), gc(9, 0)],
    expected: false,
  },
  {
    hand: [gc(10, 0), gc(2, 0), gc(3, 0), gc(4, 0), gc(5, 0)],
    expected: false,
  },
  {
    hand: [gc(10, 0), gc(11, 0), gc(10, 0), gc(1, 0), gc(10, 0)],
    expected: false,
  },
  {
    hand: [gc(6, 0), gc(9, 0), gc(8, 0), gc(6, 0), gc(10, 0)],
    expected: false,
  },
];

for (let i = 0; i < testCases.length; i++) {
  if (isSequential(testCases[i].hand) === testCases[i].expected) {
    console.log(`Test #${i + 1} success`);
  } else {
    console.log(`Test #${i + 1} failed`);
  }
}
