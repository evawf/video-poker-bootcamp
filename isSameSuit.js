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

// export { isSameSuit };
