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
- Line by Line
  - Careful, patient reading of the code line-by-line, word-by-word, character-by-character
- Rubber Duck
  - Describe the problem to a rubber duck to force yourself to articulate the problem
- Walking Away
  - Give yourself some time away from the problem
- Inspecting with a Debugger
  - User built-in debuggers such as that for Node.js to pause the program during execution and perform various actions from that point 
- Advanced Debugging
  - Use the advanced features of a debugging tool