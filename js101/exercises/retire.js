let readline = require('readline-sync');

function retire() {
  let age = Number(readline.question('What is your age? '));
  let retireAge = Number(readline.question('At what age would you like to retire? '));
  let ageDiff = retireAge - age;
  let currentYear = new Date().getFullYear();

  console.log(`\nIt's ${currentYear}. You will retire in ${currentYear + ageDiff}`);
  console.log(`You have only ${ageDiff} years of work to go!`);
}

retire();