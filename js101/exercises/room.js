const READLINE = require('readline-sync');
const SQMCONVERT = 10.7639;

console.log('Enter the length of the room in meters: ');
const length = Number(READLINE.prompt());

console.log('Enter the width of the room in meters: ');
const width = Number(READLINE.prompt());

const area = length * width;

console.log(`The area of the room is ${area.toFixed(2)} square meters (${(area * SQMCONVERT).toFixed(2)} square feet).`);