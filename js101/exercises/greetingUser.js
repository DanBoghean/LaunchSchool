let readline = require('readline-sync');

function greetUser() {
  let name = readline.question("What is your name? ");

  let scream =  name.includes("!");
  let regularStr = `Hello ${name}.`;
  let screamStr = `Hello ${name.slice(0, -1)}. Why are we screaming?`;

  return scream ? screamStr.toUpperCase() : regularStr;
}

console.log(greetUser());