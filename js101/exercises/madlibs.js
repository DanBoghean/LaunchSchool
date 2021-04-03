let readline = require('readline-sync');

function madlibs() {
  let noun = readline.question('Enter a noun: ');
  let verb = readline.question('Enter a verb: ');
  let adjective = readline.question('Enter a adjective: ');
  let adverb = readline.question('Enter a adverb: ');

  console.log(`Do you ${verb} your ${adjective} ${noun} ${adverb}? That's hilarious!`);
  console.log(`The ${adjective} ${noun} ${verb}s ${adverb} over the lazy ${noun}`);
  console.log(`The ${noun} ${adverb} ${verb}s up ${adjective} Joe's turtle`);
}

madlibs();