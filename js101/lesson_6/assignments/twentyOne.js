// 1. Initialize the deck
// 2. Deal cards to player and dealer
// 3. Player turn: hit or stay
//  - repeat until bust or stay
// 4. If player bust, dealer wins
// 5. Dealer turn: hit or stay
//  - repeat until total >= 17
// 6. If dealer busts, player wins.
// 7. Compare cards and declare winner.
let readline = require('readline-sync');

const TOTAL_GAME_NUM = 21;
const TOTAL_DEALER_NUM = 17;

let player = {
  cards: [],
  total: 0
};

let dealer = {
  cards: [],
  total: 0
};

function prompt(message) {
  return console.log(`=> ${message}`);
}

const suiteToSymbol = {
  spades:   '♠',
  diamonds: '♦',
  hearts:   '♥',
  clubs:    '♣',
};

const cardValues = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  jack: 10,
  queen: 10,
  king: 10,
  ace: 11,
};

const HIDDEN_CARD =
`┌─────────┐
│░░░░░░░░░│
│░░░░░░░░░│
│░░░░░░░░░│
│░░░░░░░░░│
│░░░░░░░░░│
│░░░░░░░░░│
│░░░░░░░░░│
└─────────┘`.split('\n');

function joinLines(strings) {
  let newArr = [];

  for (let idx = 0; idx < strings[0].length; idx++) {
    let str = [];
    for (let jIdx = 0; jIdx < strings.length; jIdx++) {
      str += strings[jIdx][idx];
    }
    newArr.push(str);
  }
  return newArr.join('\n');
}

// eslint-disable-next-line max-lines-per-function
function createCard(cardNum, suite) {
  let suiteSym = suiteToSymbol[suite];
  let displayNum = cardNum.length > 2 ?  `${cardNum[0]} ` : `${cardNum} `;
  if (cardNum === '10') {
    displayNum = '10';
  }
  let cardImage =
`┌─────────┐
│ ${displayNum}      │
│         │
│         │
│    ${suiteSym}    │
│         │
│         │
│       ${displayNum}│
└─────────┘`;
  return cardImage.split('\n');
}

function initializeDeck(cardValues) {

  let deck = {
    hearts: Object.keys(cardValues),
    diamonds: Object.keys(cardValues),
    spades: Object.keys(cardValues),
    clubs: Object.keys(cardValues),
  };

  return deck;
}

function setTotal(person) {
  let newTotal = person.cards.reduce((total, current) => {
    if (current[0] !== 'ace') {
      return total + cardValues[current[0]];
    } else {
      return total;
    }
  }, 0);

  person.cards.forEach(current => {
    if ((newTotal + 11) > TOTAL_GAME_NUM && current[0] === 'ace') {
      newTotal += 1;
    } else if (current[0] === 'ace') {
      newTotal += 11;
    }
  });

  person.total = newTotal;
}

function dealCard(deck, person, numOfCards = 1) {
  for (let card = 1; card <= numOfCards; card++) {
    let suites = Object.keys(deck);
    let randomSuite = suites[Math.floor(Math.random() * suites.length)];
    let values = deck[randomSuite];
    let valueIdx = Math.floor(Math.random() * values.length);
    let randomValue = values.splice(valueIdx, 1)[0];

    person.cards.push([randomValue, randomSuite]);

    setTotal(person);
  }
}

function hitOrStay() {
  let result;
  prompt('Would you like to hit or stay?');
  result = readline.question().toLowerCase();
  while (result !== 'hit' && result !== 'stay') {
    prompt('That is an invalid chioce.');
    result = readline.question().toLowerCase();
  }

  return result;
}

function renderCards(person, hideDealerCards = false) {
  let cardArr = [];
  for (let cardIdx = 0; cardIdx < person.cards.length; cardIdx++) {
    if (hideDealerCards && cardIdx > 0) {
      cardArr.push(HIDDEN_CARD);
    } else {
      let currentCard = person.cards[cardIdx];
      cardArr.push(createCard(currentCard[0], currentCard[1]));
    }
  }
  console.log(joinLines(cardArr));
}

function isBust(total) {
  if (total > TOTAL_GAME_NUM) {
    return true;
  }

  return false;
}

function hit(deck, person) {
  dealCard(deck, person);

  if (isBust(person.total)) {
    return true;
  }

  return false;
}

function determineWinner(player, dealer) {
  return player.total > dealer.total ? 'Player' : 'Dealer';
}

function showCards(hideDealerCards = true) {
  console.clear();
  console.log("Dealer's Cards: ");
  renderCards(dealer, hideDealerCards);

  console.log("Player's Cards: ");
  renderCards(player);
}

function playAgain() {
  console.log('-------------');
  let result;
  prompt('Would you like to play again? (y or n)');
  result = readline.question().toLowerCase();
  while (result !== 'y' && result !== 'n') {
    prompt('That is an invalid chioce.');
    result = readline.question().toLowerCase();
  }

  return result;
}

// Main Program
while (true) {
  player = {
    cards: [],
    total: 0
  };

  dealer = {
    cards: [],
    total: 0
  };

  let deck = initializeDeck(cardValues);
  let playerBust = false;
  let dealerBust = false;

  dealCard(deck, dealer, 2);
  dealCard(deck, player, 2);

  //Player loop
  while (true) {
    showCards();

    let hitOrStayResult = hitOrStay();
    if (hitOrStayResult === 'hit') {
      playerBust = hit(deck, player);

      if (playerBust) {
        break;
      }
    } else if (hitOrStayResult === 'stay') {
      break;
    } else {
      prompt("That isn't a valid choice");
    }
  }

  // If player didn't bust, dealer loop
  if (!playerBust) {
    while (true) {
      showCards();
      if (dealer.total < TOTAL_DEALER_NUM) {
        dealerBust = hit(deck, dealer);
      } else {
        break;
      }

      if (dealerBust) {
        break;
      }
    }
  }

  showCards(false);

  if (playerBust) {
    prompt('Sorry, you bust!');
  } else if (dealerBust) {
    prompt('Dealer Busts! You win!');
  } else if (determineWinner(player, dealer) === 'Player') {
    prompt('Congrats you win!');
  } else {
    prompt('Dealer Wins!');
  }

  console.log();
  console.log(`You had ${player.total}`);
  console.log(`Dealer had ${dealer.total}`);

  if (!playAgain()) break;
}