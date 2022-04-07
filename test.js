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
  console.log(playerHand);
  for (let i = 1; i < playerHand.length; i += 1) {
    if (playerHand[i].rank - temp !== 1) {
      seq = false;
      break;
    } else {
      temp = playerHand[i].rank;
      console.log(temp);
    }
  }

  let rankArr = [];
  for (let i = 1; i < playerHand.length; i += 1) {
    rankArr.push(playerHand[i].rank);
  }
  console.log(playerHand[0].rank);
  console.log(rankArr);
  console.log(Math.max(rankArr));
  if (
    playerHand[0].rank === 1 &&
    Math.max(...rankArr) === 13 &&
    Math.min(...rankArr) === 10
  )
    seq = true;

  return seq;
};

let testCases = [
  {
    hand: [gc(1, 0), gc(2, 0), gc(3, 0), gc(4, 0), gc(5, 0)],
    expected: true,
  },
  {
    hand: [gc(6, 0), gc(2, 0), gc(3, 0), gc(4, 0), gc(5, 0)],
    expected: true,
  },
  {
    hand: [gc(10, 0), gc(2, 0), gc(3, 0), gc(4, 0), gc(5, 0)],
    expected: false,
  },
  {
    hand: [gc(1, 0), gc(11, 0), gc(12, 0), gc(13, 0), gc(10, 0)],
    expected: true,
  },
  {
    hand: [gc(5, 0), gc(9, 0), gc(12, 0), gc(10, 0), gc(1, 0)],
    expected: false,
  },
];

for (let i = 0; i < testCases.length; i++) {
  // console.log(testCases[i].hand);
  if (isSequential(testCases[i].hand) === testCases[i].expected) {
    console.log(`Test #${i + 1} success`);
  } else {
    console.log(`Test #${i + 1} failed`);
  }
}

//  playerHand = [
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
