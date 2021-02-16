const readline = require('readline-sync');
const WINNING_COMBOS = {
  rock: {scissors: 'crushes', lizard: 'crushes'},
  paper: {rock: 'covers', spock: 'disproves'},
  scissors: {paper: 'cuts', lizard: 'decapitates'},
  spock: {scissors: 'smashes', rock: 'vaporizes'},
  lizard: {spock: 'poisons', paper: 'eats'}
};
let score = {player: 0, computer: 0};
let gamesPlayed = 0;
let totalGames = 0;

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
  return Math.floor(Math.random() *
                      list.length);
}

function isInvalidNumber(num) {
  return num <= 0 || Number.isNaN(num);
}

function gamesToPlay() {
  prompt('How many games do you want to play? ');
  let answer = readline.question().toLowerCase();
  while (isInvalidNumber(answer)) {
    prompt('Please enter a number greater than 0');
    answer = readline.question().toLowerCase();
  }

  return answer;
}

let options = Object.keys(WINNING_COMBOS);
let shorthandOptions = {};
let printOptions = [];
options.forEach((option) => {
  let firstChar = option[0];
  if (!Object.keys(shorthandOptions).includes(firstChar)) {
    shorthandOptions[firstChar] = option;
    printOptions.push(`(${firstChar})${option.slice(1,)}`);
  } else {
    shorthandOptions[option.slice(0,2)] = option;
    printOptions.push(`(${option.slice(0,2)})${option.slice(2,)}`);
  }
});

totalGames = gamesToPlay();
console.clear();
while (gamesPlayed < totalGames) {
  prompt(`Choose one, type the full word or the letter(s) in the parenthesis:
    ${printOptions.join(', ')}`);
  let choice = readline.question();

  while (true) {
    if (choice.length <= 2) {
      if (shorthandOptions[choice.toLowerCase()]) {
        choice = shorthandOptions[choice];
        break;
      }
      prompt("That's not a valid choice");
      choice = readline.question();
    } else {
      if (options.includes(choice)) {
        break;
      }
      prompt("That's not a valid choice");
      choice = readline.question();
    }
  }

  let randomIndex = getRandomNumber(options);
  let computerChoice = options[randomIndex];

  console.clear()
  displayWinner(choice, computerChoice);
  displayScoreboard(score);

  let majorityWin = Math.floor(totalGames / 2);
  if (score['player'] > majorityWin || score['computer'] > majorityWin) {
    break;
  }

  if (choice !== computerChoice) {
    gamesPlayed += 1;
  }
}

let playerScore = score['player'];
let computerScore = score['computer'];
let playerWinsAll = playerScore > computerScore;
let winner = playerWinsAll ? `You won ${playerScore} out of ${totalGames} games.`
  : `Computer won ${computerScore} out of ${totalGames} games.`;
let winnnerMessage = playerWinsAll ? 'CONGRATULATIONS!' : "SORRY!";

console.log(winnnerMessage);
console.log(winner);
console.log();