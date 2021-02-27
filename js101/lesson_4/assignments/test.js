let statement = "The Flinstones Rock";

let obj = {};

Array.from(statement.replaceAll(" ", "")).forEach(char => {
  obj[char] = (obj[char] + 1) || 1;
});
console.log(obj);