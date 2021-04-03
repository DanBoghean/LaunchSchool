function penultimate(str) {
  let newStr = str.split(' ');
  return newStr[newStr.length - 2];
}
console.log(penultimate("last word")); // logs true
console.log(penultimate("Launch School is great!") === "is"); // logs true