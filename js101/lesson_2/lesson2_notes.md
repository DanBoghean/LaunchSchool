# JS101

## Lesson 2 Notes

### Logical Operators
- Use parentheses with expressions that involve multiple operators

```
(num < 10) && (num > 3)
```

- Both `&&` and `||` exhibit a behavior called **short-circuiting**. That means JavaScript stops evaluating sub-expressions once it can determine a final value.
  - In the case of `&&`, JavaScript short-circuits when it realizes that the entire expression can't be true; that is when it encounters a false sub-expression
  - With `||`, it short-circuits when it realizes that the expression can't be false; that is, at least one sub-expression is true.

### Truthiness
- JavaScript evaluates almost all values as true. These are the exceptions that evaluate as false:
  - `false`
  - `undefined`
  - `null`
  - `0`
  - `""`
  - `NaN`

### Debugging
1. **Reproduce the Error**
   - Reproduce the exact error to make sure that it is consistent
1. **Determine the Boundaries of the Error**
   - Find exactly what part of the code is causing the error
1. **Trace the Code**
   - Use an example and go through the code to identify which part of the code is failing
1. **Understand the Problem Well**
   - Break down the problem into smaller parts to test to see exactly where the issue arises
1. **Implement a Fix**
   - If it's your code, implement the fix. If it's something you can't change, you may have to supress the error, for example.
1. **Test the Fix**
   - After implementing the fix, make sure you verify that the code fix the problem by usuing a similar set of tests from step #2

**Techinques for Debugging**
- **Line by Line**
  - Careful, patient reading of the code line-by-line, word-by-word, character-by-character
- **Rubber Duck**
  - Describe the problem to a rubber duck to force yourself to articulate the problem
- **Walking Away**
  - Give yourself some time away from the problem
- **Inspecting with a Debugger**
  - User built-in debuggers such as that for Node.js to pause the program during execution and perform various actions from that point 
- **Advanced Debugging**
  - Use the advanced features of a debugging tool

### Type Coercion
**Explicit Type Coercion**
- **Coercing values to numbers**
  - `Number()` coerces strings to numbers. 
    - It also coerces other other types such as `{}`, `[]`, and other primitive types like undefined and null.
    ```
    > Number({})
    NaN
    > Number([])
    0
    > Number([4])
    4
    > Number([undefined])
    0
    > Number([1, 2, 3])
    NaN
    > Number(undefined)
    NaN
    > Number(null)
    0
    > Number(true)
    1
    > Number(false)
    0
    ```
  - `parseInt()` and `parseFloat()` convert strings to integers or floating points respectively
    - `parseInt()` also accepts a radix as a second argument to convert from a specific base number
    - They attempt to convert a string even if there are non-numeric characters. They will stop parsing when they find a non-numeric character
    ```
    > parseInt('12oz')
    12
    > parseInt('+12oz')
    12
    > Number('12oz')
    NaN
    ```
  - You can use a unary operator like + to coerce a value to a number. It works similar to the Number() function but is more succinct
    ```
    > +""
    0
    > +'1'
    1
    > +'2.3'
    2.3
    > +[]
    0
    > +'abc'
    NaN
    ```
- **Coercing values to strings**
  - Use `toString()` on a type to convert it to a string representation.
    ```
    > (42).toString()
    '42'
    > true.toString()
    'true'
    > [1, 2, 3].toString()
    '1,2,3'
    > let obj = {a: 'foo', b: 'bar'}
    > obj.toString()
    '[object Object]'}
    ```
    - `null` and `undefined` elements return a TypeError as you can't call a method on either of those types
  - Another way to coerce values to strings is by using the `String()` function
    ```
    > String(42)
    '42'
    > String([1, 2, 3])
    '1,2,3'
    > String({ a: 'foo', b: 'bar' })
    '[object Object]'
    ```
    - `String()` works will `null` and `undefined`
  - Template literals implicitly coerces interplation expressions like `${something}` to string values

**Implicit Type Coercion**
  - **Implicit Coercion with the `==` operator**
    - `==` implicitly coerces one of its operands when the operands have different types 
      ```
      > '1' === 1 // strict equality compares two values directly
      false
      > '1' == 1  // non-strict equality coerces '1' into a number
      true
      > 1 == true // true is coerced to number equivalent of 1
      true
      > 3 == true
      false
      > 0 == false // false is coerced to number equivalent of 0
      true
      > '1' == true // true is coerced to 1 and comparison becomes '1' == 1
      true
      > undefined == null
      true
      ```
    - `==` behaves like `===` when both operands are objects, that is, it considers two objects equal only when they're the same object 
      ```
      > let arr = []
      > arr == []
      false
      > arr == arr
      true
      ```
    - However, when one of the operands is an object and the other a primitive `==` coerces the object to a primitive before making the comparison.
      ```
      > '' == {} // Object is converted to the string '[object Object]'
      false
      > '[object Object]' == {}
      true
      > [] == '' // Empty array is coerced into an empty string
      true
      ```
    - Things to remember:
      1. When a number is compared with a string using ==, the string is coerced into a number
      1. When a boolean is compared with any value, it is coerced into a number and compared again
      1. When an object is comparted with a primitive value, the object is coerced into a primitive value and compared
      1. A `==` comparison of `undefined` with `null` evaluates to `true`
- **Implicit Coercion with the Binary `+` operator**
  -  When one of the operands of the `+` operator is a string, the other operand is also coerced and concatenated with the string
    ```
    > 'number ' + 1
    'number 1'
    > '' + [1, 2, 3]
    '1,2,3'
    > '' + true
    'true'
    > '' + undefined
    'undefined'
    > '' + {}
    '[object Object]'
    ```
  - When both operands are a combination of numbers, booleans, `null`s, or `undefined`s, they are converted to numbers and added together:
    ```
    1 + true;       // 2
    1 + false;      // 1
    true + false;   // 1
    null + false;   // 0
    null + null;    // 0
    1 + undefined;  // NaN
    ```
  - When one of the operands is an object, both operands are converted to strings and concatenated together:
    ```
    [1] + 2;        // "12"
    [1] + '2';      // "12"
    [1, 2] + 3;     // "1,23"
    [] + 5;         // "5"
    [] + true;      // "true"
    42 + {};        // "42[object Object]"
    ```
  - The relational operatores `<`, `>`, `<=`, `>=` compare strings lexicographically, otherwise JavaScript converts both operands to numbers before comparing them.
    ```
    11 > '9';       // true -- '9' is coerced to 9
    '11' > 9;       // true -- '11' is coerced to 11
    123 > 'a';      // false -- 'a' is coerced to NaN; any comparison with NaN is false
    123 <= 'a';     // also false
    true > null;    // true -- becomes 1 > 0
    true > false;   // true -- also becomes 1 > 0
    null <= false;  // true -- becomes 0 <= 0
    undefined >= 1; // false -- becomes NaN >= 1
    ```
- **Best Practices**
  - **Always use explicit type coercions**
  - **Always use strict equality and inequality operators**

### Tips & Tricks
  - **Naming Things**
    - Choose descriptive names. Variable names shuld describe the content of the variable.
    - Don't hardcode values into a variable name because of future uncertainty that the values may change
    - Use camelCase when naming everything, except classes or constructors which are PascalCase or global constants which are UPPERCASE and separated by a _.
      ```
      // number, string, array, object
      let myNumber = 26;
      let myString = 'Double 13';
      let myArray = [13, 13];
      let myObject = {
        count: 26,
      };
      
      // functions
      let addValues = function (a, b) {
        return a + b;
      };
      ``` 
  - Don't use 'Magic Numbers' within code, instead set those numbers to a constant.
    ```
    const NUMBER_CARDS_IN_HAND = 5;
    
    function dealHand() {
      let hand = [];
      for (let cardNumber = 0; cardNumber < NUMBER_CARDS_IN_HAND; ++cardNumber) {
        hand.push(dealCard());
      }
    
      return hand;
    }
    ```   
- **Formating**
  - When indenting code, always use 2 space characters, not tabs.
  - When using curly braces, if your block is multiple lines, the opening brace is on the same line as the intial statement and the ending brace is on its own line.
    ```
    if (myObject.myNumber > 26) {
      console.log('Number is greater than 26');
    } else {
      console.log('Number is less than or equal to 26');
    }
    ```
  - If your block contains just a single-line statement, you may condense it on one line.
  - `if`, `for`, and `while` statements always use spaces between the keyords and following opening parenthesis, and between closing parenthesis and opening brace.
     ```
     // Bad
     let counter=0;
     while(counter<15){
       counter+=1;
     }
     
     // Good
     let counter = 0;
     while (counter < 15) {
       counter += 1;
     }
    ``` 
- **Function Guidelines**
  - Make sure that functions do one thing and that their responsibility is limited.
    - This implies that your functions shouold be short. If it's more than 15 lines long, consider splitting it into 2 or more fucntions
  - A function is said to have **side effects** if it does any of the following:
    - It reassigns any non-local varaible. Reassigning a variable in the outer scope would be a side effect.
    - It mutates the value of any object referenced by a non-local variable. Mutating an array or object argument, for instance, would be a side effect.
    - It reads from or writes to a file, network connection, browser, or the system hardware. **Side effects like this include writing to the console log and reading input from the terminal**
    - It raises an exception without handling it
    - It calls another function that has side effects.
      ```
      // side effect: logs output to the console
      // returns: undefined
      
      function displayTotal(num1, num2) {
        console.log(num1 + num2);
      }
      
      // side effect: mutates the passed-in array
      // returns: updated array
      
      function append(targetArr, valueToAppend) {
        targetArr.push(valueToAppend);
        return targetArr;
      }
      ```
      - Here is an example of a function with no side effects:
      ```
      // side effect: none
      // returns: a new number
      
      function computeTotal(num1, num2) {
        return num1 + num2;
      }
      ```
      - Most functions should return a useful value or they should hav ea side effect, not both. (There are exceptions. For instance, if you read something from a database, you have to return a value.)
      - Function names should reflect whether side effects occur.
  - When working with a function, you should mentally extract the function from the program and work with it in isolation. Working this way helps compartmentalize your foucs.
  - You should avoid functoins that print things to the console and return a useful value. For instance, `getAndDisplayTotal` function might display a total value and also return it. Those are two distinct actions that you may not always want to do together.
  - Your goal should be to build small functions that are stand-alone pieces of functionality that you can use to piece together larger structures.
  - Prefix functions that output values with something like `print`, `say` or `display`
- **Miscallaneous Tips**
  - Know when to use a regular `while` loop vs a generic `while (true)` loop.
    ```
    let answer = '';
    while (answer.toLowerCase() !== 'n') {
      console.log('Continue? (y/n)');
      let answer = readline.question();
    }
    
    VS

    while (true) {
      console.log('Continue? (y/n)');
      let answer = readline.question();
      if (answer.toLowerCase() === 'n') break;
    }
    ```
- **Organization**
  - Learn to organize chunks of code to make it easier to read. 
  - Name your functions appropriately so that you know what they do
  - Don't mutate the caller during iteration
    ```
    let words = ['scooby', 'do', 'on', 'channel', 'two'];
    
    words.forEach(word => {
      console.log(word);
      words.shift();
    });
    
    console.log(words); // logs ['channel', 'two']
    ```
  - Don't use assignment in a conditional
    ```
    // bad
    let someVariable;
    
    if (someVariable = getAValueFromSomewhere()) {
      console.log(someVariable);
    }
    
    // good
    
    let someVariable = getAValueFromSomewhere();
    
    if (someVariable) {
      console.log(someVariable);
    }
    ```
  - User underscore for unused callback parametesr
    ```
    let names = ['kim', 'joe', 'sam'];
    names.forEach(_ => {
      console.log('Got a name!')
    });
    ```
  - 

### Variable Scope
**Global Scope**
  - Very small JS programs with no functions existing entirely within a single scope
  - Think of global variables as variables that are available across your program. You can use them anywehre in the program, either globablly or from inside a function or block.

**Local Scope**
  - **Function Scope**
    - Functions define a new scope for local variables. A variable's scope is determined by where it is declared
    - **Rule 1**: Outer scope variables can be access by the inner scope
      ```
      let a = 1;         // outer scope variable
      
      function logA() {
        console.log(a);  // => 1
        a += 1;          // a is reassigned to a new value
      }
      
      logA();
      console.log(a);   // => 2  "a" was re-assigned in the inner scope
      ```
    - **Rule 2**: Inner scope variables cannot be access in outer scope
      ```
      function aFunc() {
        let a = 1;
      }
      
      aFunc();
      console.log(a); // ReferenceError: a is not defined
      ```
      - Note that a local variable only comes into existence when you call that function. The mere act of definite a function doesn't create any variables. When we call the function on line 5, a variable `a` is created, assigned the value `1` and immediately discarded once the function finishes execution and control returns to the main flow of the program
    - **Rule 3**: Peer scopes do not conflict
      ```
      function funcA() {
        let a = 'hello';
        console.log(a);
      }
      
      function funcB() {
        console.log(a); // ReferenceError: a is not defined
      }
      
      funcA();
      funcB();
      ```
    - **Rule 4**: Nested Functions have their own variable scope
      ```
      let a = 1;           // first level variable
      
      function foo() {     // second level
        let b = 2;
      
        function bar() {   // third level
          let c = 3;
          console.log(a);  // => 1
          console.log(b);  // => 2
          console.log(c);  // => 3
        }
      
        bar();
      
        console.log(a);    // => 1
        console.log(b);    // => 2
        console.log(c);    // => ReferenceError
      }
      
      foo();
      ```
    - **Rule 5**: Inner scope variables can shadow outer scope variables
      - When we have a variable in the outer scope and one in the inner scope with the same name, it is called variable shadowing and it prevents access to the outer scope local variable. Avoid shadowing with long descriptive names.
      ```
      let number = 10;
      
      [1, 2, 3].forEach(number => {
        console.log(number);
      });
      ```

  - **Block Scope**
    - Blocks are segments of code statements grouped by opening and closing curly braces `{}` such as `if/else` and `for` and `while` loops, but not all code between curly braces is a block (such as a function body)
    - The rules for block scopes are identical to those of function scopes

### Passing By Reference vs Value
  - When you pass primitive values into functions, no operation performed on a primitive value can permanently alter the value.
  - When using objects, JavaScript exhibits a combination of behaviors from both pass-by-reference as well as pass-by-value. Some people call this *pass-by-value-of-the-reference* or *call-by-sharing*
  - **When an operation within the function mutates its argument, it affects the original object.
  - Functions and methods that mutate their callers are called destructive functions or methods. (e.g. Array.prototype.push)
    ```
    function addNames(arr, name) {
      arr.push(name);
    }
    
    let names = ["bob", "kim"];
    addNames(names, "jim");
    console.log(names); // => [ 'bob', 'kim', 'jim' ]
    ```
  - Reassignment is not a destrucive operation
    ```
    function addName(arr, name) {
      arr = arr.concat([name]);
    }
    
    let names = ["bob", "kim"];
    addName(names, "jim");
    console.log(names); // => [ 'bob', 'kim', ]
    ```
  - Values returned by functions can be thought of as being pass-by-value or pass-by-reference
    - Primitive values are treated as pass-by-value
    ```
    function foo(number) {
      return number;
    }
    
    let number = 1;
    let newNumber = foo(number);
    ```
    - Objects can be treated as pass-by-value or pass-by-reference
    ```
    function bar(array) {
      return array;
    }
    
    let array = [1, 2, 3];
    let newArray = bar(array);
    console.log(array === newArray); // true
    ```