const READLINE = require('readline-sync');

const int = parseInt(READLINE.question('Please enter an integer greater than 0: '), 10);
const operation = READLINE.question('Enter "s" to compute the sum, or "p" to compute the product. ');

function consecutiveInt(int, operation) {
  let sum;
  if (operation === 's') {
    sum = 0;
    for (let i = 1; i <= int; i++) {
      sum += i;
    }
    console.log(`The sum of the integers between 1 and ${int} is ${sum}`);
  } else if (operation === 'p') {
    sum = 1;
    for (let i = 1; i <= int; i++) {
      sum *= i;
    }
    console.log(`The sum of the integers between 1 and ${int} is ${sum}`);
  } else {
    console.log('Unknown Operation.');
  }

  return sum;
}
// If operation == s
// SET sum = 0
//  For each number from 1 and int
//   sum += number 
// If operation == p
//  For each number from 1 and int
//    sum *= number

consecutiveInt(int, operation);