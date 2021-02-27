# JS101

## Lesson 4 Notes

### String Methods 
**STRINGS ARE IMMUTABLE**

**String.Prototype.concat**
  - Concatenates two or more strings similar to the `+`.
  - Can receive multiple string arguments.
  - Implicitly coerces any other type to a string and then combines them
    ```
    let arr = ['a', 'b', 'c'];
    let str = 'test';
    str.concat(arr); // returns 'testa,b,c'
    ```

**String.prototype.includes**
  - Takes a string as an argumetn and returns a boolean signifying whether the string exists within the string that the `includes` was called on
  ```
  > 'One potato, two potato, three potato, four'.includes('three')
  true
  > 'One potato, two potato, three potato, four'.includes('tater')
  false
  > 'abc'.includes('a')
  true
  ```
  - Also takes an optional second argument to indicate which index to start searching from

**String.prototype.split**
  - Separates a given string into multiple strings and returns them in the form of an array
  - When no argument is provided, the string itself is returned in an array
  ```
  > 'abcdef'.split()
  ['abcdef']
  ```
  - When an empty string is passed in, the string is split by each character
  ```
  > 'abcdef'.split('')
  ['a', 'b', 'c', 'd', 'e', 'f']
  ```
  - Any other string argument will be used as a separator by which to split the string
  ```
  > 'One potato, two potato, three potato, four'.split(', ')
  [ 'One potato', 'two potato', 'three potato', 'four' ]
  ```

**String.prototype.trim**
  - Removes whitespace form both ends of the string it's called on. Useful for when getting input from users
  ```
  > '  abcdef   '.trim()
  'abcdef'
  ```
  - It removes all whitespace characters including `\n` and `\t`
  - `trimStart` removes whitespace from the beginning and `trimEnd` removes whitespace form the end

**toUpperCase and toLowerCase**
  - Changes the case of the string to uppercase or lowercase respectively

**String.prototype.charAt**
  - Nearly identical to using brackets on a string. It takes an index as an argument and returns the character at that index in the given string
  - The difference between `charAt` and `[]` occurs when using indexes for characters that don't exist: `charAt` returns an empty string while `[]` returns undefined

**String.prototype.charCodeAt**
  - Similar to `charAt` but instead of returning the character at the given index, it returns the Unicode code point or character code of the character at that index.
  ```
  > 'abcdef'.charCodeAt(1)
  98
  ```
  - If you don't provide an index, `charAtCode` assumes the index `0`

### PEDAC
**P - [Understand the] Problem**
  1. Read the problem description
  1. Check the test cases, if any
  1. If any part of the problem is unlcear, ask the interviewer or problem requester to clarify the matter

  Example:
  ```
  // PROBLEM:
  
  // Given a string, write a function changeMe which returns the same
  // string but with all the words in it that are palindromes uppercased.
  
  // changeMe("We will meet at noon") == "We will meet at NOON"
  // changeMe("No palindromes here") = "No palindromes here"
  // changeMe("") == ""
  // changeMe("I LOVE my mom and dad equally") == "I LOVE my MOM and DAD equally"
  ```

  What is a palindrome? You might ask the interviewer to tell you what a palindrome is, and the interviewer would tell you that it is a word that reads the same forwards and backward.
  
  Should the words in the string remain the same if they already use uppercase? Here, you can check the test cases. In the fourth test case, the word LOVE already uses uppercase, and it remains uppercase in the solution.
  
  How should I deal with empty strings provided as input? The test cases frequently answer this question. In this case, test case number 3 provides the answer. This is an implicit requirement that we can infer from the test cases.
  
  Can I assume that all inputs are strings? Test cases don't show any non-string inputs, so you should ask whether the inputs can contain non-string values, and what you should do with them. In this problem, we won't worry about non-string values.
  
  Should I consider letter case when deciding whether a word is a palindrome? Again, test cases don't show any appropriate examples. The interviewer might tell you that the palindrome words should be case sensitive: mom is a palindrome, Mom is not.
  
  Do I need to return the same object or an entirely new one? This question isn't relevant to our current problem since JavaScript strings are immutable and any operation on them will result in a new string. In general, though, this question is one of the most important and most overlooked that you can ask. Typically, while solving problems, students make certain assumptions. One assumption they might make is to return the same object; they often start solving the problem without checking whether that assumption is correct. For this reason, the student may end up losing 10-15 minutes struggling with the wrong problem.
  
  Always verify your assumptions by looking at the test cases or by asking the interviewer. As discussed in the above point, students often make assumptions about the problem or the expected output that may not be what the interviewer has in mind. That can lead to a waste of time pursuing an incorrect or incomplete solution. Make sure to confirm that your assumptions are correct before you proceed to start developing your algorithm.

  - Identify explicit and implicit requirements
  ```
  // input: string
  // output: string (not the same object)
  // rules:
  //      Explicit requirements:
  //        - every palindrome in the string must be converted to
  //          uppercase. (Reminder: a palindrome is a word that reads
  //          the same forwards and backward).
  //        - Palindromes are case sensitive ("Dad" is not a palindrome, but
  //          "dad" is.)
  
  //      Implicit requirements:
  //        - if the string is an empty string, the result should be an empty array
  ```

**Data Structure / Algorithm**
  - Data structures influence your algorithm
  Example:
  ```
  // PROBLEM:
  
  // Given a string, write a function `palindromeSubstrings` which returns
  // all the substrings from a given string which are palindromes. Consider
  // palindrome words case sensitive.
  
  // Test cases:
  
  // console.log(palindromeSubstrings("supercalifragilisticexpialidocious"))
  // should return: ["ili"]
  //
  // console.log(palindromeSubstrings("abcddcbA"))
  // should return: ["bcddcb", "cddc", "dd"]
  //
  // console.log(palindromeSubstrings("palindrome"))
  // should log: []
  //
  // console.log(palindromeSubstrings(""))
  // should log: []
  ```

  Defining the requirements:
  ```
  // Some questions you might have?
  // 1. What is a substring?
  // 2. What is a palindrome?
  // 3. Will inputs always be strings?
  // 4. What does it mean to treat palindrome words case-sensitively?
  
  // input: string
  // output: an array of substrings
  // rules:
  //      Explicit requirements:
  //        - return only substrings which are palindromes.
  //        - palindrome words should be case sensitive, meaning "abBA"
  //          is not a palindrome.
  
  //      Implicit requirements:
  //        - if the string is an empty string, the result should be an empty array
  ```

  Algorithm:
  ```
  // Algorithm:
  //  - declare a result variable and initialize it to an empty array
  //  - create an array named substrArray that contains all of the
  //    substrings of the input string that are at least 2 characters long.
  //  - loop through the words in the substrArray array.
  //  - if the word is a palindrome, append it to the result
  //    array
  //  - return the result array
  ```

### Array Methods
**Array.prototype.forEach**
  - A more concise way to do looping on arrays
  ```
  [1, 2, 3].forEach(number => {
    console.log(number);
  });
  ```
  - Does something in the callback function for each element in the array and returns `undefined` 
  - `forEach` with strings
    - You have to convert the string to an array
    ```
    'abcd'.split('').forEach(char => {
      console.log(char);
    });
    // logs
    // a
    // b
    // c
    // d

    Array.from('abcd').forEach(char => {
      console.log(char);
    });
    ```
  - `forEach` with objects
    - You have to conver the object to an array of keys, values, or entries
    ```
    let produce = {
      apple: 'Fruit',
      carrot: 'Vegetable',
      pear: 'Fruit',
      broccoli: 'Vegetable'
    };
    
    let produceValues = Object.values(produce);
    
    produceValues.forEach(value => {
      console.log(value);
    });
    // logs
    // Fruit
    // Vegetable
    // Fruit
    // Vegetable
    ```

    ```
    let produceKeyValues = Object.entries(produce);
    // produceKeyValues contains:
    //   [['apple', 'Fruit'],
    //    ['carrot', 'Vegetable'],
    //    ['pear', 'Fruit'],
    //    ['broccoli', 'Vegetable']]
    
    produceKeyValues.forEach(keyValue => {
      let [ key, value ] = keyValue;
    
      console.log(`${key} is a ${value}`);
    });
    // logs:
    // apple is a Fruit
    // carrot is a Vegetable
    // pear is a Fruit
    // broccoli is a Vegetable
    ```

**Array.prototype.filter**
  - When you want to select or filter the values in an array based on a condition
  ```
  let oddNumbers = [1, 2, 3].filter(num => {
    return num % 2 === 1;
  });
  
  oddNumbers; // => [1, 3]
  ```
  - Returns a new array with the elements that return a truthy value from the callback function
  - Better to use a `forEach` for objects to filter

**Array.prototype.map**
  - Performs a transformation on each element within an array
  ```
  > [1, 2, 3].map(num => num * 2)
  [ 2, 4, 6 ]

  > [1, 2, 3].map(num => num % 2 === 1)
  [ true, false, true ]
  ```
  - Returns a new array with the return value of the callback function for each element in the array

**Array.prototype.some**
  - Returns a boolean if any element returns true in the callback function
  ```
  > [1, 2, 3].some(num => num > 2)
  true
  
  > [1, 2, 3].some(num => num > 3)
  false
  ```

**Array.prototype.every**
  - Returns a boolean if all eleemnts return true in the callback function
  ```
  > [1, 2, 3].every(num => num > 2)
  false
  
  > [3, 4, 5].every(num => num > 2)
  true
  ```

**Array.prototype.find**
  - Returns the first element for which the callback function returns a truthy value
  ```
  > [2, 1, 4, 3, 5].find(num => num > 2)
  4
  ```

**Array.prototype.findIndex**
  - Returns the index of the element for which the callback returns a truthy value
  ```
  > [2, 1, 4, 3, 5].findIndex(num => num > 2)
  2
  ```
  
**Array.prototype.reverse**
  - Reverses the elements of the array it's called on. It MUTATES the original array
  ```
  > [1, 2, 5, 7, 3].reverse()
  [ 3, 7, 5, 2, 1 ]
  ```

**Array.prototype.includes**
  - It looks for the argument in the array used to call it and returns true if the argument exists or false if it doesn't
  ```
  > [2, 1, 3].includes(1)
  true
  
  > [2, 1, 3].includes(5)
  false
  ```

