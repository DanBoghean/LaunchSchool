// output: Boolean
// rules:
//  Palindromic number is a number that reads the same forwards and backwards
//
// Conver the number to a string
// Convert the string to an array
// Reverse the array and join back into a string
// If it is equal to the original number, return true, otherwise false


function isPalindromicNumber(num) {
  let stringNum = String(num);
  let reverseNum = stringNum.split('').reverse().join('');
  return reverseNum === stringNum;
}

console.log(
  isPalindromicNumber(34543),        // true
  isPalindromicNumber(123210),       // false
  isPalindromicNumber(22),           // true
  isPalindromicNumber(5),            // true
)