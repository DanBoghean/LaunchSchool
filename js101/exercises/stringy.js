function stringy(num) {
  return '10'.repeat(num).slice(0, num);
}

console.log(
  stringy(6),    // "101010"
  stringy(9),    // "101010101"
  stringy(4),    // "1010"
  stringy(7),    // "1010101"
  stringy(1),    // "1010101"
);