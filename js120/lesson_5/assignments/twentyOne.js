// Game (n)
// start (v)

// Deck (n)
// deal (v) (Maybe it should be in the Dealer?)

// Card (n)
// Participant (n)
// Player (n)
// hit (v)
// stay (v)
// bust (state)
// Score (n, state)

// Dealer (n)
// hit (v)
// stay (v)
// deal (Maybe it should be in the Deck?)
// bust (state)
// Score (n, state)

const readline = require("readline-sync");
const shuffle = require("shuffle-array");

class Card {
  static SUITS = ["Clubs", "Diamonds", "Hearts", "Spades"];
  static RANKS = ["2", "3", "4", "5", "6", "7", "8", "9", "10",
                  "Jack", "Queen", "King", "Ace"];

  constructor(suit, rank) {
    this.suit = suit;
    this.rank = rank;
    this.hidden = false;
  }

  toString() {
    if (this.isHidden()) return "Hidden";
    return `${this.getRank()} of ${this.getSuit()}`;
  }

  getRank() {
    return this.rank;
  }

  getSuit() {
    return this.suit;
  }

  isAce() {
    return this.getRank() === "Ace";
  }

  isKing() {
    return this.getRank() === "King";
  }

  isQueen() {
    return this.getRank() === "Queen";
  }

  isJack() {
    return this.getRank() === "Jack";
  }

  isFaceCard() {
    return this.isKing() || this.isQueen() || this.isJack();
  }

  hide() {
    this.hidden = true;
  }

  reveal() {
    this.hidden = false;
  }

  isHidden() {
    return this.hidden;
  }
}

class Deck {
  constructor() {
    this.cards = [];
    Card.SUITS.forEach(suit => {
      Card.RANKS.forEach(rank => {
        this.cards.push(new Card(suit, rank));
      });
    });
     this.shuffleCards();
  }

  shuffleCards() {
    shuffle(this.cards);
  }

  dealCardFaceUp() {
    return this.cards.pop();
  }

  dealCardFaceDown() {
    let card = this.dealCardFaceUp();
    card.hide();
    return card;
  }
}

let Hand = {
  addToHand(newCard) {
    this.cards.push(newCard);
  },

  resetHand() {
    this.cards = [];
  },

  showHand(caption) {
    console.log(caption);
    console.log("");

    this.cards.forEach(card => console.log(`  ${card}`));
    console.log("");
  },

  getCards() {
    return this.cards;
  },

  revealAllCards() {
    this.cards.forEach(card => card.reveal());
  },

  numberOfCards() {
    return this.cards.length;
  }
};

class Participant {
  constructor() {

  }
}

class Player {
  static INITIAL_PURSE = 5;
  static WINNING_PURSE = 2 * Player.INITIAL_PURSE;

  constructor() {
    this.money = Player.INITIAL_PURSE;
    this.resetHand();
  }

  hit() {

  }

  stay() {

  }

  isBusted() {

  }

  score() {

  }
}

class Dealer extends Participant {
  constructor() {

  }

  hit() {

  }

  stay() {

  }

  isBusted() {

  }

  score() {

  }

  hide() {

  }

  reveal() {

  }

  deal() {

  }
}

class TwentyOneGame {
  constructor() {

  }

  start() {
    this.displayWelcomeMessage();
    this.dealCards();
    this.showCards();
    this.playerTurn();
    this.dealerTurn();
    this.displayResult();
    this.displayGoodbyeMessage();
  }

  dealCards() {

  }

  showCards() {

  }

  playerTurn() {

  }

  dealerTurn() {

  }

  displayWelcomeMessage() {

  }

  displayGoodbyeMessage() {

  }

  displayResult() {

  }
}

let game = new TwentyOneGame();
game.start();