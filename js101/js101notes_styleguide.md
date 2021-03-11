# JS101 Notes

## Style Guide

- 2 Space Characters, **Not Tabs**. (Set your editor to insert spaces when using the `Tab` key)
- Limit lines to **80** Characters
- User **camelCase** formatting for variable and function names. 
- Constructor Functions use **PascalCase**
- User **uppercase** names with **underscores** to represent const values that don't change
- When writing code with curly braces, write the opening brace on the same line as the function name or conditional expression
- Use spaces between operatores and operands
- Use semicolons to terminate each logical line of code

## Declaring and assigning variables

- All variable declarations are initialized with a value of `undefined`
- Variables can be initialized with a more useful values `let firstName = 'Dan'`
  - This will still return `undefined`
- During declaration the `=` is a syntactic token that tells JS that you're going to supply an initial value
- However, in an assignment, the `=` is called the assignment operator


**Idiomatic Names**
  **Non-constant variables and object properties**
  - employee	
  - number	
  - fizzBuzz	
  - speedOfLight	
  - destinationURL - URL is an acronym
  - m00n	
  **Constructor functions and classes**	
  - Cat 
  - BoxTurtle	
  - FlightlessBird	
  **Other functions**
  - parseURL - URL is an acronym
  - goFaster	
  **Configuration and magic constants**
  - ABSOLUTE_PATH	
  - TODAY	
  **Other const names**
  - employeeOfMonth - Local style
  - HairyCat - Local style
  - ABSOLUTE_PATH - Local style

**Valid but Non-Idiomatic Names**
  **Universally non-idiomatic**
  - $number - Begins with $
  - fizz_buzz	- snake_case not allowed
  - fizzBUZZ - BUZZ is not an acronym
  - _hello - Begins with _
  - goodbye_ - Ends with _
  - milesperhour - Undifferentiated words
  - MILESPERHOUR - Undifferentiated words
  **Non-constant variables and object properties**
  - Employee - Begins with capital letter
  - fizzBUZZ - BUZZ is not an acronym
  - FIZZ_BUZZ - SCREAMING_SNAKE_CASE
  **Constructor functions and classes**
  - cat - Begins with lowercase letter
  - makeTurtle - Begins with lowercase letter
  - FIZZ_BUZZ - SCREAMING_SNAKE_CASE
  **Other functions**
  - ParseURL - Begings with capital letter
  - FIZZ_BUZZ - SCREAMING_SNAKE_CASE
  **Configuration and magic constants**
  - absolutePath - Not SCREAMING_SNAKE_CASE
  - Today - Not SCREAMING_SNAKE_CASE

  **Note** that non-idiomatic names are not invalid names. Non-idiomatic names are commonly used by external libraries to provide names that are easy to type yet unlikely to conflict with names in other libraries. For instance, the jQuery library uses a function named $ as well as variables whose name begins with $, while the underscore.js library leans heavily on a variable named _.

**Invalid Names**
- 42ndStreet - Begins with number
- fizz-buzz - Hyphen not allowed
- fizz.buzz - Looks like property reference