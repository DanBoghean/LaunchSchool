let readline = require('readline-sync');

// eslint-disable-next-line max-lines-per-function
function createPlayer() {
  return {
    move: null,
    score: 0,
  };
}

function createHuman() {
  let playerObject = createPlayer();

  let humanObject = {
    choose() {
      let choice;

      while (true) {
        console.log('Please choose rock, paper, or scissors:');
        choice = readline.question();
        if (['rock', 'paper', 'scissors'].includes(choice)) break;
        console.log('Sorry, invalid choice.');
      }

      this.move = choice;
    }
  };

  return Object.assign(playerObject, humanObject);
}

function createComputer() {
  let playerObject = createPlayer();

  let computerObject = {
    choose () {
      const choices = ['rock', 'paper', 'scissors'];
      let randomIndex = Math.floor(Math.random() * choices.length);
      this.move = choices[randomIndex];
    }
  };

  return Object.assign(playerObject, computerObject);
}

const RPSGame = {
  human: createHuman(),
  computer: createComputer(),

  displayWelcomeMessage() {
    console.log('Welcome to Rock, Paper, Scissors!');
  },

  displayGoodbyeMessage() {
    console.log('Thanks for playing Rock, Paper, Scissors. Goodbye!');
  },

  displayWinner() {
    let humanMove = this.human.move;
    let computerMove = this.computer.move;

    console.log(`You chose: ${humanMove}`);
    console.log(`The computer chose: ${computerMove}`);

    if ((humanMove === 'rock' && computerMove === 'scissors') ||
        (humanMove === 'paper' && computerMove === 'rock') ||
        (humanMove === 'scissors' && computerMove === 'paper')) {
      this.human.score += 1;
      console.log('You win!');
    } else if ((humanMove === 'rock' && computerMove === 'paper') ||
                (humanMove === 'paper' && computerMove === 'scissors') ||
                (humanMove === 'scissors' && computerMove === 'rock')) {
      this.computer.score += 1;
      console.log('Computer wins!');
    } else {
      console.log("It's a tie!");
    }
  },

  displayScore() {
    console.log(`The score is: YOU - ${this.human.score} COMPUTER - ${this.computer.score}`);
  },

  playAgain() {
    console.log('Would you like to play again? (y/n)');
    let answer = readline.question();
    return answer.toLowerCase()[0] === 'y';
  },

  play() {
    this.displayWelcomeMessage();
    while (true) {
      this.human.choose();
      this.computer.choose();
      this.displayWinner();
      console.log('');
      this.displayScore();
      if (!this.playAgain()) break;
    }
    this.displayGoodbyeMessage();
  },
};

RPSGame.play();