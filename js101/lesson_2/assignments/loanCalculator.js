// Ask for Loan Amount
// Ask for APR
// Ask for loan duration in years

// Calculate Monthly Interest Rate
// Calculate loan duration in months

// Calculate monthly payment in dollars and cents

const readline = require('readline-sync');

function prompt(message) {
  console.log(`=> ${message}`);
}

function isInvalidNumber(num) {
  return num <= 0 || Number.isNaN(num);
}

function inputAsNumber() {
  return parseFloat(readline.question().replace('$', '').replaceAll(',', ''));
}

function getNumber(message) {
  prompt(message);
  let userInput = inputAsNumber();

  while (isInvalidNumber(userInput)) {
    prompt('Please enter a valid number that is greater than 0.');
    userInput = inputAsNumber();
  }

  return userInput;
}

function calculateMonthlyPayment(loan, monthlyInterest, durationInMonths) {
  return loan *
          (monthlyInterest /
            (1 - Math.pow(
              (1 + monthlyInterest), (-durationInMonths))));
}

function calculateMonthlyInterest(apr) {
  let monthlyInterest;
  monthlyInterest = (parseFloat(apr) / 100) / 12;

  return monthlyInterest;
}

while (true) {
  const loanAmount = getNumber('What is your loan amount? ');

  const apr = getNumber('What is your APR in %? ');
  const monthlyInterest = calculateMonthlyInterest(apr);

  const durationInYears =  getNumber('What is your duration in years? ');
  const durationInMonths = durationInYears * 12;

  let monthlyPayment = calculateMonthlyPayment(
    loanAmount, monthlyInterest, durationInMonths);
  let totalPayment = monthlyPayment * durationInMonths;

  console.log('\n------------------------------------');
  console.log(`Your monthly payment amount is $${monthlyPayment.toFixed(2)}`);
  console.log(`Your total payment is $${totalPayment.toFixed(2)}`);
  console.log(`Your total interest is $${(totalPayment - loanAmount).toFixed(2)}`);

  prompt('\nWould you like to do another loan calculation? (y/n)');
  let calculateAgain = readline.question().toLowerCase();
  if (!(calculateAgain === 'y')) break;
}