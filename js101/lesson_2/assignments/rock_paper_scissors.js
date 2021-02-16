const readline = require('readline-sync');
const WINNING_COMBOS = {
  rock: ['scissors', 'lizard'],
  paper: ['rock', 'spock'],
  scissors: ['paper', 'lizard'],
  spock: ['scissors', 'rock'],
  lizard: ['spock', 'paper']
};

function prompt(message) {
  console.log(`=> ${message}`);
}

function playerWins(choice, computerChoice) {
  return WINNING_COMBOS[choice].includes(computerChoice);
}

function displayWinner(choice, computerChoice) {
  prompt(`You chose ${choice}, the computer chose ${computerChoice}`);

  let message;
  if (choice === computerChoice) {
    message = "It's a tie!";
  } else {
    message = playerWins(choice, computerChoice)
      ? 'You win!'
      : 'Computer wins';
  }

  prompt(`${message}`);
}

let options = Object.keys(WINNING_COMBOS);
let shorthandOptions = {};
let printOptions = [];
options.forEach((x) => {
  let firstChar = x[0];
  if (!Object.keys(shorthandOptions).includes(firstChar)) {
    shorthandOptions[firstChar] = x;
    printOptions.push(`(${firstChar})${x.slice(1,)}`);
  } else {
    shorthandOptions[x.slice(0,2)] = x;
    printOptions.push(`(${x.slice(0,2)})${x.slice(2,)}`);
  }
});

while (true) {
  prompt(`Choose one, type the full word or the letter(s) in the parenthesis:
    ${printOptions.join(', ')}`);
  let choice = readline.question();

  if (choice.length <= 2) {
    while (!shorthandOptions[choice[0].toLowerCase()]) {
      prompt("That's not a valid choice");
      choice = readline.question();
    }

    choice = shorthandOptions[choice];
  } else {
    while (!options.includes(choice)) {
      prompt("That's not a valid choice");
      choice = readline.question();
    }
  }

  let randomIndex = Math.floor(Math.random() *
                      options.length);
  let computerChoice = options[randomIndex];

  displayWinner(choice, computerChoice);

  prompt('Do you want to play again (y/n)?');
  let answer = readline.question().toLowerCase();
  while (answer[0] !== 'n' && answer[0] !== 'y') {
    prompt('Please enter "y" or "n".');
    answer = readline.question().toLowerCase();
  }

  if (answer[0] !== 'y') break;
}