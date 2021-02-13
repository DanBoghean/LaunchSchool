const READLINE = require('readline-sync');

const bill = parseFloat(READLINE.question('What is the bill? '));
const percentage = parseFloat(READLINE.question('What is the tip percentage? ')) / 100;

let tip = (bill * percentage);
let total = (bill + tip);

console.log(`The tip is $${tip.toFixed(2)}`);
console.log(`The total is $${total.toFixed(2)}`);