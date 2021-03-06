# JS101

## Lesson 5 Notes

### Sorting
  - Sorting is typically performed on arrays
  - Strings don't have access to any built-in sorting methods.
  - Objects don't have a set order, so no point in sorting them
  - `sort` is DESTRUCTIVE. 

  - JavaScript `Array.prototype.sort` will convert all numbers to strings and compares them by Unicode character codes when called without any arguments
  ```
  > [2, 11, 9, 4, 107, 21, 1].sort()
  [ 1, 107, 11, 2, 21, 4, 9 ]
  ```
  - `undefined` values are a special case. They are always placed at the end no matter what the other values are

  **Sorting arrays of strings alphabetically**
  - Calling sort on an array of characters returns an array of characters, order alphabetically
  ```
  > ['c', 'a', 'e', 'b', 'd'].sort()
  [ 'a', 'b', 'c', 'd', 'e' ]
  ```

  - When working with strings that have multiple characters, sort compares them character by character, so the strings bginning with `a` come before those beginning with `b`. If both characters are the same, then the next character in each string is compared, and so on. 
  ```
  > ['arc', 'bat', 'cape', 'ants', 'cap'].sort()
  [ 'ants', 'arc', 'bat', 'cap', 'cape' ]
  ```
  
  - **UTF-16**
  - JavaScript compares characters by using the character's code point in the UTF-16 encoding.
  ```
  > '+'.charCodeAt()
  43
  > '3'.charCodeAt()
  51
  > '+' < '3'
  true // since 43 < 51

  > 'A' < 'a'         // 65 < 97
  true
  > 'Z' < 'a'         // 90 < 97
  true
  > '!' < 'A'         // 33 < 65
  true
  ``` 

  **Generic Sorting**
  - How do we sort `[2, 11, 9, 4, 107, 21, 1]` numerically?
    - `sort` takes an option callback argument that determines the final sequence produced
  ```
  [2, 11, 9, 4, 107, 21, 1].sort((a, b) => {
    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    } else {
      return 0;
    }
  }); // => [ 1, 2, 4, 9, 11, 21, 107 ]

  // This can be simplified
  [2, 11, 9, 4, 107, 21, 1].sort((a, b) => a - b); 

  // If you want to sort in descending order, flip the logic
  [2, 11, 9, 4, 107, 21, 1].sort((a, b) => b - a); 
  ```
    - The `sort` function iterates over the array and supplies the callback function with two elements each time. It arranges the relative positions of the two elements using the following rules:
      1. If the callback returns a number less than 0, place `a` before `b`
      1. If the callback returns a number greater than 0, place `b` before `a` 
      1. If the callback returns 0, leave the relative positions of `a` and `b` unchanged
  
  - Let's say we want to sort subarrays based on the total score of each subarray:
  ```
  let scores = [[3, 6, 4], [6, 8, 9], [1, 4, 2]];
  scores.sort((a, b) => {
    let totalAScore = a.reduce((number, next) => number + next);
    let totalBScore = b.reduce((number, next) => number + next);
  
    return totalAScore - totalBScore;
  });
  ``` 
  - **Note:** Using `a` and `b` parameters in a callback function for `sort` is a common convetion, even though it conflicts with the stle rules that say you shouldn't use single-character variable names.