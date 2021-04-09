# JS120

## Lesson 2 Notes

### Object Prototypes
  - Objects can inherit properties and behaviors from other objects (prototypcal inheritance)
    - The object that you inherit properties and methods from is called the **prototype**
    - The function `Object.create` creates a new object that inherits properties from an existing object
    ```
    let a = {
      foo: 1,
      bar: 2,
    };
    
    let b = Object.create(a);
    b.foo; // => 1
    ```
    - The object `b` in the above example doesn't receive any properties or methods of its own. It delegates property and method access to its prototype.
    ```
    > let a = { foo: 1, bar: 2 }
    undefined
    
    > let b = Object.create(a)
    undefined
    
    > b.foo
    1
    
    > b
    {}
    ```
    - You can evalute this using the `hasOwnProperty` method
    ```
    let a = {
      foo: 1,
      bar: 2,
    };
    
    let b = Object.create(a);
    
    console.log(a.hasOwnProperty('foo')); // => true
    console.log(b.hasOwnProperty('foo')); // => false
    ```

    - JavaScript objects use an internal `[[Prototype]]` property to keep track of their prototype. 
      - You can use `Object.getPrototypeOf` to  determine an object's prototype
      - You can use `Object.setPrototypeOf` to set the prototype object of an object
      ```
      let a = {
        foo: 1,
        bar: 2,
      };
      
      let b = {};
      Object.setPrototypeOf(b, a);
      
      console.log(b.foo);                    // => 1
      console.log(b);                        // => {}
      console.log(Object.getPrototypeOf(b)); // => { foo: 1, bar: 2 }
      ```
    - Objects hold a ***reference*** to their prototype objects through their internal `[[Prototype]]` property
      - If the object's prototype changes in some way, the changes are observable in the inheriting object as well
    
  ## Iterating over Object with prototypes
  - A `for/in` loop iterates over an object's properties. The iteration includes properties from the objects in is prototype chain. Use the `hasOwnProperty` to skip the protoype properties
  - `Object.keys` returns an object's "own" property keys - you don't need to use the `hasOwnProperty`

  ## The Prototype Chain
  ```
  let a = {
    foo: 1,
  };

  let b = {
    bar: 2,
  };

  let c = {
    baz: 3,
  };

  Object.setPrototypeOf(c, b);
  Object.setPrototypeOf(b, a);

  console.log(c.bar); // => 2
  console.log(c.foo); // => 1
  ```
  - Object `c` inherits from object `b` which, in turn, inherits from `a`. All properties that you can access on `a` or `b` are now available on `c`. We say that objects `b` and `a` are part of the **prototype chain** of object `c`. The complete prototype chain also includes the default prototype, which is the prototype of object `a` in this case. Since the prototype of `Object.prototype` is `null`, the complete prototype chain looks like this:
  ```
  c --> b --> a --> Object.prototype --> null
  ```

  ## Property Look-Up in the Prototype Chain
  - JavaScript first looks for an "own" property with the name on the object. If the object doesn't definte the property, JavaScript looks for it in the object's prototype. If it can't find the property there, it looks in the prototype's prototype. This process continues until it finds the property or it reaches `Object.prototype`. If `Object.prototype` also doesn't define the property, the property access evalutes to `undefined`

  - When two objects in the same prototype chain have a property with the same name, the object that's closer to the calling object takes precedence
  ```
  let a = {
    foo: 1,
  };

  let b = {
    foo: 2,
  };

  Object.setPrototypeOf(b, a);

  let c = Object.create(b);
  console.log(c.foo); // => 2;
  ```

  - Setting a property always treats the property as an "own" property. It will assign the property to the object it was called on, not the prototype
  ```
  let a = {
    foo: 1,
  };

  let b = {
    foo: 2,
  };

  Object.setPrototypeOf(b, a);

  let c = Object.create(b);
  console.log(c.foo); // => 2
  c.foo = 42;
  console.log(c.foo); // => 42
  console.log(b.foo); // => 2
  ```

  ### Objects without prototypes
  - You can create a "blank" object without any prototypes by setting the prototype of the object to `null`
  ```
  > let a = Object.create(null)
  undefined

  > Object.getProtoypeOf(a)
  null
  ```

## Function Expressions
  ## Function Declarations vs Function Expressions
  - Function declarations allow you to call a function before it is defined using **hoisting** where the JavaScript engine "moves" the function declaration to the top of the page before execution
  ```
  prompt('How are you today?');
  
  function prompt(message) {
    console.log(`=> ${message}`);
  }
  ```
  - Functions expressions are part of an expression and can't be called before definition.

  - Typically, we assign a function expression to a variable or object property, pass it to another function, or return it to a calling function:
  ```
  let prompt = function() { // Assign to a variable
  
  };
  
  [1, 2, 3].forEach(function(elem) { // pass to another function
    console.log(elem);
  });
  
  
  function makeIncrementer(increment) {
    return function(value) { // return to caller
      return value + increment;
    }
  }
  ```

  - We can define function expressions without giving them a name. In the above example, `prompt` is not the name of the function, instead we've assigned an unnamed function to the `prompt` variable.
  - Such unnamed functions are called **anonymous functions**
  - Function expressions don't have to be anonymous, you can name a function expression:
  ```
  let squaredNums = [1, 2, 3].map(function squareNum(num) {
    return num * num;
  }); // => [1, 4, 9]
  ```
    - The advantage to naming a function expression occurs when the function throws an error. If the function has a name, the stack trace uses that name to help you determine where the error occurred.

  **Arrow Functions**
  - Arrow functions are always function expressions. We often pass them around or assign them to variables or properties
  - Arrow functions are always anonymous, there's no way to define a named arrow function

  ## First Class Function
  - **First-class functions** refers to the fact that functions in JavaScript are values that we can assign to variables and properties, pass them to other functions, or return them from another function
  ```
  function say(words) {
    console.log(words);
  }
  
  let speak = say;
  
  speak('Howdy!');   // logs 'Howdy'
  ```
  - `say` is declared as a function and then assigned to the variable `speak`. We then invoke the function using `speak` as a handle. Note that we can still call the function using `say` as well.

  ```
  function logNum(num) {
    console.log('Number: ' + num);
  }
  
  [1, 2, 3].forEach(logNum);
  // Number: 1
  // Number: 2
  // Number: 3
  ```
  - We're passing the function `logNum` as an argumetn to the `forEach` method.

## Higher Order Functions
  - A higher-order function is a function that has at least one of the following properties:
    1. It takes a function as an argument
    1. It returns a function

  ## Functions that accept functions as arguments
  - Array methods like `forEach`, `map`, `filter`, and `reduce` each take a function argument
  - Abstracts away mechanics of a function and leaves the details for the developer to provide at runtime
  ```
  function mapNumsToSquares(nums) {
    let squaredArray = [];
  
    for (let index = 0; index < nums.length; index++) {
      let current = nums[index];
      squaredArray.push(current * current);
    }
  
    return squaredArray;
  }
  ```
  BECOMES:
  ```
  arrayOfNums.map(num => num * num);
  ```

  ## Functions that return a function
  - You can think of a function that returns another function as a function factory
    - It creates and returns a new functin
  ```
  function greet(language) {
    switch (language) {
      case 'en':
        console.log('Hello!');
        break;
      case 'es':
        console.log('Hola!');
        break;
      case 'fr':
        console.log('Bonjour!');
    }
  }
  
  greet('fr'); // logs 'Bonjour!'
  ```
  - This implementation works, but it would be useful if we only had to provide the language once.
  - Instead of a `greet` function, let's implement a greeter factory that lets us create a greeter function for a given language
  ```
  function createGreeter(language) {
    switch (language) {
      case 'en':
        return () => console.log('Hello!');
      case 'es':
        return () => console.log('Hola!');
      case 'fr':
        return () => console.log('Bonjour!');
    }
  }
  
  let greeterEs = createGreeter('es');
  greeterEs(); // logs 'Hola!'
  greeterEs(); // logs 'Hola!'
  greeterEs(); // logs 'Hola!'
  
  let greeterEn = createGreeter('en');
  greeterEn(); // logs 'Hello!'
  ```

## The Global Object
  - JavaScript creates a global object when it starts running. It serves as the **implicit execution context** for function invocations.
  - In Node.js, the global object is the object named `global`; in the browers, it's the `window` object
  - The global object is available everywhere in the program and houses important global properties
    - Global values such as `Infinity` and `NaN` and global functions such as `isNan` and `parseInt` all are properties of the global object
  
  ## Global Object and Undeclared Variables
  - Whenever you assign a value to a variable without using the `let`, `const`, or `var` keywords, the variable gets added to the global object as a property
  ```
  foo = 'bar';
  global.foo; // => 'bar' (in Node)
  window.foo; // => 'bar' (in a browser)
  ```
  - Whenever you try to access a variable for which there are no local or global variables with the variable's name, JavaScript looks at the global object and looks for a property with that name. 

## Implicit and Explicit Execution Context
  ## Execution Context
  - The **execution context** or **context** is a concept that refers to the **environment** in which a function executes
    - In JavaScript it most commonly refers to the current value of the `this` keyword
  - The context depends on how the function or method was invoked, not on where the function was defined
    - It doesn't matter where or when you call it, the only factor that determines the context is how you call the function or method
      - Two invocation of the same function or method can have very different contexts depending on how you make those calls

  - There are two basic ways to set the context when calling a function or method:
    1. **Explicit**: The execution context that you set explicitily
    1. **Implict**: The execution context that JavaScript sets implicitly when your code doesn't provide an explicit context

  - Setting the execution context is also called **binding** `this` or **setting the binding**. 
    - A binding is something that ties two things together. In this case, it referes to the fact htat a call binds `this` to a specific object when the function or method is called

  ## Function Execution Context (Implicit)
  - Every JavaScript function call has an execution context, every time you call a function, JavaScript binds some object to `this`
  ```
  function foo() {
    console.log("this refers to: " + this);
  }
  
  foo();
  // this refers to: [object global]
  ```
    - Within a regular function call, JavaScript sets the binding for `this` to the global object. 
      - If you use `this` to access or modify properties you will access or modify properties on the global object
  - Since all function calls have an execution context, and since a regular function call does not provide an explicit context, JavaScript supplies an implicit context: the global object.

  ## Strict Mode and Implicit Context
  - When strict mode is enabled, the implicit `this` is assigned to `undefined` instead of the global object
  ```
  "use strict"; // the quotes are required
  
  function foo() {
    console.log("this refers to: " + this);
  }
  
  foo(); // this refers to: undefined
  ```

  ## Method Execution Context (Implicit)
  - **Method execution context** is the execution context of an object that is used to call a method that belongs to an object. 
    - We usually say that method calls provide an implicit execution context
  ```
  let foo = {
    bar: function() {
      console.log(this);
    }
  };
  
  foo.bar(); // `foo` is the implicit execution context for `bar`
  // { bar: [Function: bar] }
  ```
  - The first-class nature of JavaScript functions has ramifications for the execution context. Remember that the context is determined solely by how you call the function or method. Here, `foo.bar()` is considered a method call since we call it as a method; That is, we used the method call syntax `object.method()`. Since JavaScript functions are first-class objects, `bar` can be called in toerh ways that change the context:
  ```
  let baz = foo.bar;
  baz(); // Object [global] {...}
  ```
  - Since we're calling `baz` as a standalone function, its execution context is the global object, ***not*** the `foo` object

  ## Explicit Execution Context with `call`
  - One method that all JavaScript functions have is `call`. The `call` method calls a function with an explicit execution context
  ```
  function logNum() {
    console.log(this.num);
  }
  
  let obj = {
    num: 42
  };
  
  logNum.call(obj); // logs 42
  ```
  - We can call the `logNum` function and tell it to use `obj` as its execution context. When we use `call` in this manner, `this`refers to the `obj` object inside the `logNum` function. The first argument to `call` provides the explicit context for the function invocation

  - The context doesn't get determined until we invoke the function
  - The code is functionally similar to the following:
  ```
  function logNum() {
    console.log(this.num);
  }
  
  let obj = {
    num: 42
  };
  
  obj.logNum = logNum;
  obj.logNum(); // logs 42
  ```
  - The difference here is that the `call` method doesn't mutate the object

  - You can use the `call` method to explicitly set execution context on methods, not just functions:
  ```
  let obj1 = {
    logNum() {
      console.log(this.num);
    }
  };
  
  let obj2 = {
    num: 42
  };
  
  obj1.logNum.call(obj2); // logs 42
  ```

  - Suppose our function takes arguments. How do we provide them with the `call` method?
  ```
  function sumNum(num1) {
    return this.num + num1;
  }
  
  let obj = {
    num: 42
  };

  obj.num = sumNum.call(obj, 5);
  console.log(obj.num); // => 47
  ```

  This is the same as:
  ```
  function sumNum(num1) {
    return this.num + num1;
  }
  
  let obj = {
    num: 42
  };
  
  obj.sumNum = sumNum;
  obj.num = obj.sumNum(5);
  console.log(obj.num); // => 47
  ```

  ## Explicit Execution Context with `apply`
  - The `apply` method works in much the same way as `call`, the only difference is that `apply` users an array to pass any arguments to the function
  ```
  someObject.someMethod.apply(context, [arg1, arg2, arg3, ...])
  ```
    - This is handy when you have the list of arguments in an array.
    - In modern JavaScript, `apply` isn't needed since you can use `call` in conjunction with the spread operator to accomplish the same thing
    ```
    let args = [arg1, arg2, arg3];
    someObject.someMethod.call(context, ...args);
    ```

## Hard Binding Functions with Contexts
  ```
  function sumNum(num1) {
    return this.num + num1;
  }
  
  let obj = {
    num: 42
  };
  
  let sumNum2 = sumNum.bind(obj);
  sumNum2(5); // => 47
  ```
  - The `bind` method returns a new function. The new function is **permanently** bound to the object passed as `bind`'s first argument. You can then pass that method around and call it without worrying about losing its context since it's permanently boudn to the provided object

  ```
  let object = {
    a: 'hello',
    b: 'world',
    foo: function() {
      return this.a + ' ' + this.b;
    },
  };
  
  let bar = object.foo;
  bar();                                // "undefined undefined"
  
  let baz = object.foo.bind(object);
  baz();                                // "hello world"

  let object2 = {
    a: 'hi',
    b: 'there',
  };
  
  baz.call(object2);  // "hello world" - `this` still refers to `object`
  ```
  - You cannot change the execution context, even if you use `call` or `apply` or call `bind` a second time.
  - JavaScript implements the `bind` method something like this:
  ```
  Function.prototype.bind = function (...args) {
    let fn = this;
    let context = args.shift();
  
    return function () {
      return fn.apply(context, args);
    };
  };
  ```
  - `bind` returns a new function, and that new function si permanently context-bound to the object provided as the first argument to `bind`. The origina lfunction isn't change dand doesn't have its context changed

## Dealing with Context Loss
  ## Method Copied from Object
  - The context gets stripped and `repeatThreeTimes` doesn't have access to the `john` object.
  ```
  function repeatThreeTimes(func) {
    func(); // can't use func.call(john); john is out of scope
    func();
    func();
  }
  
  function foo() {
    let john = {
      firstName: 'John',
      lastName: 'Doe',
      greetings: function() {
        console.log('hello, ' + this.firstName + ' ' + this.lastName);
      },
    };
  
    repeatThreeTimes(john.greetings); // Strips context
  }
  
  foo();
  
  // => hello, undefined undefined
  // => hello, undefined undefined
  // => hello, undefined undefined
  ```
  - One solution would be to provide the context as an additional parameter
  ```
  function repeatThreeTimes(func, context) {
    func.call(context);
    func.call(context);
    func.call(context);
  }
  
  function foo() {
    let john = {
      firstName: 'John',
      lastName: 'Doe',
      greetings: function() {
        console.log('hello, ' + this.firstName + ' ' + this.lastName);
      },
    };
  
    repeatThreeTimes(john.greetings, john);
  }
  
  foo();
  
  // hello, John Doe
  // hello, John Doe
  // hello, John Doe
  ```
  - Array methods like `forEach`, `map`, and `filter` use this technique. They take a callback function as an argument and an optional `thisArg` context object that gets used as the callback's execution context

  - Sometimes it isn't possible to pass a context argument to a function or method. Another approach to use is to hard-bind the method's context using bind
  ```
  function repeatThreeTimes(func) {
    func();
    func();
    func();
  }
  
  function foo() {
    let john = {
      firstName: 'John',
      lastName: 'Doe',
      greetings: function() {
        console.log('hello, ' + this.firstName + ' ' + this.lastName);
      },
    };
  
    repeatThreeTimes(john.greetings.bind(john));
  }
  
  foo();
  
  // => hello, John Doe
  // => hello, John Doe
  // => hello, John Doe
  ```
  - Once you bind a context to a function, that binding is permanent and does not need to be repeated if it gets called more than once.
  - The disadvantage of `bind` is that it is no longer possible to determine the context by looking at the invocation of the final function

  ## Inner Function Not Using the Surrounding Context
  ```
  let obj = {
    a: 'hello',
    b: 'world',
    foo: function() {
      function bar() {
        console.log(this.a + ' ' + this.b);
      }
  
      bar();
    },
  };
  
  obj.foo();        // => undefined undefined
  ```
  - Since the function `bar` is invoked as a standalone function, the execution context is the global object. It doesn't matter where the function is invoked.

  **Solution 1: Preserve Context with a Variable in Outer Scope**
  - One common way to preserve the context in this scenario is to use something like `let self = this` or `let that = this` in the outer function. If you define `self` or `that` variable in the otuer scope, you can use that variable and whatever value it contains inside your nested inner function
  ```
  let obj = {
    a: 'hello',
    b: 'world',
    foo: function() {
      let self = this;
  
      function bar() {
        console.log(self.a + ' ' + self.b);
      }
  
      bar();
    },
  };
  
  obj.foo(); // => hello world
  ```

  **Solution 2: Call Inner Function with Explicit Context**
  - You can also use `call` or `apply` to explicitly provide a context when calling the inner function:
  ```
  let obj = {
    a: 'hello',
    b: 'world',
    foo: function() {
      function bar() {
        console.log(this.a + ' ' + this.b);
      }
  
      bar.call(this);
    },
  };
  
  obj.foo(); // => hello world
  ```

  **Solution 3: Use `bind`**
  ```
  let obj = {
    a: 'hello',
    b: 'world',
    foo: function() {
      let bar = function() {
        console.log(this.a + ' ' + this.b);
      }.bind(this);
  
      // some code
      bar();
  
      // some more code
      bar();
  
      // still more code
    }
  };
  
  obj.foo();
  // => hello world
  // => hello world
  ```
  - One advatange of `bind` is that you can do it once and then call it as often as needed without an explicit context

  **Solution 4: Using an Arrow Function**
  - Arrow functions have a property that comes in very handy when dealing with context loss; they inherit their execution context from the surrounding scope. That means that an arrow function defined inside another function always has the same context as the outer function. 
  ```
  let obj = {
    a: 'hello',
    b: 'world',
    foo: function() {
      let bar = () => {
        console.log(this.a + ' ' + this.b);
      }
  
      // some code
      bar();
  
      // some more code
      bar();
  
      // still more code
    }
  };
  
  obj.foo();
  // => hello world
  // => hello world
  ```
  - Using arrow functions like this is similar to using `bind` in that you don't have to worry about arrow functions losing their surrounding context. An arrow function, once created, always has the same context as the function that surrounded it when it was created. 

  **Note:** Despite how useful arrow functions are for avoiding context loss, you should not try to use them as methods on an object, they don't work as expected.
  ```
  let obj = {
    a: 5,
  
    foo: () => {
      console.log(this.a);
    },
  };
  
  obj.foo(); // => undefined
  ```
  - Arrow functions always get the value of `this` from the surrounding context, and in this case, the surrounding context is the **global object**. The reason for that is simple: the `let` statement in this example is in the program's top-level code, so its context is the global object. That means that `this` inside the object literal is also the global object.
  - This violates the rule that the context is always determined entirely by how a function or method is invoked, however, you won't usually see code like this in practice. 
  - In General, you shouldn't use arrow functions to write methods.

## Function as Argument Losing Surrounding Context
  ```
  function repeatThreeTimes(func) {
    func();
    func();
    func();
  }

  let john = {
    firstName: 'John',
    lastName: 'Doe',
    greetings: function() {
      repeatThreeTimes(function() {
        console.log('hello, ' + this.firstName + ' ' + this.lastName);
      });
    },
  };

  john.greetings();

  // => hello, undefined undefined
  // => hello, undefined undefined
  // => hello, undefined undefined
  ```
  - The context for all three invocations will be the global object
  - Here is an example that you might actually see:
  ```
  let obj = {
    a: 'hello',
    b: 'world',
    foo: function() {
      [1, 2, 3].forEach(function(number) {
        console.log(String(number) + ' ' + this.a + ' ' + this.b);
      });
    },
  };

  obj.foo();

  // => 1 undefined undefined
  // => 2 undefined undefined
  // => 3 undefined undefined
  ```
  - The function in this case would have the wrong `this` context. You can fix it by using the same solutions to the previous assignment (preserve the context with a variable in the outer scope, call the function with context, bind the function, or use an arrow function)

