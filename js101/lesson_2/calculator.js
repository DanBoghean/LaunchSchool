// Ask the user for the first number.
// Ask the user for the second number.
// Ask the user for an operation to perform.
// Perform the operation on the two numbers.
// Print the result to the terminal.

const readline = require('readline-sync');
const MESSAGES = require('./calculator_messages.json');
const LANGUAGE = 'en';

function messages(message, lang='en') {
  return MESSAGES[lang][message];
}

function prompt(key) {
  let message = messages(key, LANGUAGE);
  console.log(`=> ${message}`);
}

function invalidNumber(number) {
  return number.trimStart() === '' || Number.isNaN(Number(number));
}

while (true) {
  prompt('Welcome');

  prompt('Number1');
  let number1 = readline.question();

  while (invalidNumber(number1)) {
    prompt('InvalidNumber');
    number1 = readline.question();
  }

  prompt('Number2');
  let number2 = readline.question();

  while (invalidNumber(number2)) {
    prompt('InvalidNumber');
    number2 = readline.question();
  }

  prompt('Operation');
  let operation = readline.question();

  while (!['1', '2', '3', '4'].includes(operation)) {
    prompt('InvalidOperation');
    operation = readline.question();
  }

  let output;
  switch (operation) {
    case '1':
      output = Number(number1) + Number(number2);
      break;
    case '2':
      output = Number(number1) - Number(number2);
      break;
    case '3':
      output = Number(number1) * Number(number2);
      break;
    case '4':
      output = Number(number1) / Number(number2);
      break;
  }

  console.log(`The result is: ${output}`);

  prompt('Recalculate');
  let calcAnswer = readline.question().toLowerCase();

  if (calcAnswer !== 'y') break;
}