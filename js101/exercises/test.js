// Start with a substring of 1 character
// Create a loop to iterate through all the characters of the string
//  if the next character is not equal to the first character
//    start at the top and increase the substring by one character
//  else if the testSubstring index > string.length you've found a match
// Otherwise you haven't

function repeatedSubstringPattern(str) {
  let substring = str[0];

  while (substring.length <= str.length / 2) {
    let idx;
    for (idx = substring.length; idx < str.length; idx += substring.length) {
      let testSubstring = str.slice(idx, idx + substring.length);
      if (substring !== testSubstring) {
        break;
      }
    }

    if (idx === str.length) return true;
    substring = str.slice(0, substring.length + 1);
  }

  return false;
}

console.log(repeatedSubstringPattern("aaa"));
console.log(repeatedSubstringPattern("abab"));
console.log(repeatedSubstringPattern("aba"));
console.log(repeatedSubstringPattern("aabaaba"));
console.log(repeatedSubstringPattern("abaababaab"));
console.log(repeatedSubstringPattern("abcabcabcabc"));
console.log(repeatedSubstringPattern("abcabcabc"));