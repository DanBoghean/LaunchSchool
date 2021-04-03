function multiply(num1, num2) {
  return num1 * num2;
}
console.log(multiply(5, 3) === 15); // logs true

let square = num => multiply(num, num);

console.log(square(5));

let powerOfN = (num, pow) => {
  if (pow === 1) return num;
  return multiply(powerOfN(num, pow - 1), num);
};

console.log(powerOfN(3, 3));
