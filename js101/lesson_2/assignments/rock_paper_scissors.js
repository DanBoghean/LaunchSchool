const readline = require('readline-sync');
const WINNING_COMBOS = {
  rock: {scissors: 'crushes', lizard: 'crushes'},
  paper: {rock: 'covers', spock: 'disproves'},
  scissors: {paper: 'cuts', lizard: 'decapitates'},
  spock: {scissors: 'smashes', rock: 'vaporizes'},
  lizard: {spock: 'poisons', paper: 'eats'},
};
let score = {player: 0, computer: 0};
let gamesPlayed = 0;
let totalGames = 0;

let options = Object.keys(WINNING_COMBOS);
let shorthandOptions = {};
let printOptions = [];
options.forEach((option) => {
  let shorthand;
  let index;
  // eslint-disable-next-line id-length
  for (let i = 0; i < option.length; i++) {
    shorthand = option.slice(0, i + 1);
    if (!Object.keys(shorthandOptions).includes(shorthand)) {
      index = i;
      break;
    }
  }
  shorthandOptions[shorthand] = option;
  printOptions.push(`(${shorthand})${option.slice(index + 1,)}`);
});

function prompt(message) {
  console.log(`=> ${message}`);
}

function playerWins(choice, computerChoice) {
  return Object.keys(WINNING_COMBOS[choice]).includes(computerChoice);
}

function updateScore(winner) {
  score[winner] += 1;
}

function getWinnerMessage(choice, computerChoice) {
  let message;
  let playerWinner = playerWins(choice, computerChoice);

  if (choice !== computerChoice) {
    if (playerWinner) {
      prompt(`${choice} ${WINNING_COMBOS[choice][computerChoice]} ${computerChoice}`);
      message = 'You win!';
      updateScore('player');
    } else {
      prompt(`${computerChoice} ${WINNING_COMBOS[computerChoice][choice]} ${choice}`);
      message = 'Computer wins!';
      updateScore('computer');
    }
  } else {
    message = "It's a tie!";
  }

  return message;
}

function displayWinner(choice, computerChoice) {
  prompt(`You chose ${choice}. The computer chose ${computerChoice}`);
  let message = getWinnerMessage(choice, computerChoice);
  prompt(`${message}`);
}

function displayScoreboard(currentScore) {
  console.log('');
  console.log(`------Current Score (Game ${gamesPlayed + 1} of ${totalGames})--------`);
  console.log(`\tPlayer: ${currentScore['player']} Computer: ${currentScore[
    'computer']}`);
  console.log('-----------------------------------------');
  console.log('\n');
}

function getRandomNumber(list) {
  return Math.floor(Math.random() * list.length);
}

function isInvalidNumber(input) {
  return input % 2 !== 1 || input <= 0 || Number.isNaN(Number(input));
}

function gamesToPlay() {
  prompt('How many games do you want to play? ');
  let answer = readline.question().toLowerCase();
  while (isInvalidNumber(answer)) {
    prompt('Please enter a number greater than 0 and an odd number.');
    answer = readline.question().toLowerCase();
  }

  return answer;
}

function playAgain() {
  prompt('Would you like to play again? (y/n)');
  let answer = readline.question().toLowerCase();
  while (answer !== 'y' && answer !== 'n') {
    prompt('Please select y or n.');
    answer = readline.question().toLowerCase();
  }

  return answer.toLowerCase();
}

function validateChoice(choice) {
  let result = choice;
  while (true) {
    if (result.length <= 2) {
      if (shorthandOptions[result.toLowerCase()]) {
        result = shorthandOptions[result.toLowerCase()];
        break;
      }
      prompt("That's not a valid choice");
      result = readline.question();
    } else {
      if (options.includes(result.toLowerCase())) {
        break;
      }
      prompt("That's not a valid choice");
      result = readline.question();
    }
  }

  return result;
}

totalGames = gamesToPlay();
console.clear();
while (true) {
  while (gamesPlayed < totalGames) {
    prompt(`Choose one, type the full word or the letter(s) in the parenthesis:
      ${printOptions.join(', ')}`);
    let choice = readline.question();
    choice = validateChoice(choice);

    let randomIndex = getRandomNumber(options);
    let computerChoice = options[randomIndex];

    //console.clear();
    displayWinner(choice, computerChoice);
    displayScoreboard(score);

    let majorityWin = Math.floor(totalGames / 2);
    if (score['player'] > majorityWin || score['computer'] > majorityWin) {
      let playerScore = score['player'];
      let computerScore = score['computer'];
      let playerWinsAll = playerScore > computerScore;
      let winner = playerWinsAll ? `You won ${playerScore} out of ${totalGames} games.`
        : `Computer won ${computerScore} out of ${totalGames} games.`;
      let winnnerMessage = playerWinsAll ? 'CONGRATULATIONS!' : "SORRY!";

      console.log(winnnerMessage);
      console.log(winner);
      console.log();
    }

    if (choice !== computerChoice) {
      gamesPlayed += 1;
    }
  }

  if (playAgain() === 'n') {
    break;
  }
}