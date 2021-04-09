// eslint-disable-next-line max-lines-per-function
function convertNumeral(str) {
  let numerals = {
    i: 1,
    v: 5,
    x: 10,
    l: 50,
    c: 100
  };

  let numArr = Array.from(str.toLowerCase()).map(char => {
    return numerals[char];
  });

  let sum = 0;
  numArr.forEach((num, idx) => {
    if (idx < numArr.length - 1 && num < numArr[idx + 1]) {
      sum -= num;
    } else {
      sum += num;
    }
  });

  return sum;
}

console.log(convertNumeral("CXXIX"));