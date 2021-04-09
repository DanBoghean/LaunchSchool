# JS120

## Lesson 3 Notes

### Constructors
  - **Object constructors** are another way to create objects in JavaScript
    - They look and act a lot like a factory function: you dfine a constructor once then invoke it each time you want ot create an object of that type
  - This is a `car` object:
  ```javascript
  let car = {
    make: 'Toyota',
    model: 'Corolla',
    year: 2016,
    started: false,
  
    start() {
      this.started = true;
    },
  
    stop() {
      this.started = false;
    },
  };
  ```
  - This is a factory function to create individual cars
  ```javascript
  function createCar(make, model, year) {
    return {
      make, // shorthand for `make: make`
      model,
      year,
      started: false,
  
      start() {
        this.started = true;
      },
  
      stop() {
        this.started = false;
      },
    };
  }
  
  let corrola = createCar('Toyota', 'Corolla', 2016);
  let leaf = createCar('Nissan', 'LEAF', 2018);
  let nova = createCar('Chevrolet', 'Nova', 1974);
  ```
  - This is accomplishing the same thing using a constructor function
  ```javascript
  function Car(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.started = false;
  
    this.start = function() {
      this.started = true;
    };
  
    this.stop = function() {
      this.started = false;
    };
  }
  
  let corrola = new Car('Toyota', 'Corolla', 2016);
  let leaf = new Car('Nissan', 'LEAF', 2018);
  let nova = new Car('Chevrolet', 'Nova', 1974);
  ```
  - Defining a constructor is nearly identical to defining an ordinary function, but there are differences
    - Constructor names begin with a capital letter (not required but it is a convention)
    - We call a constructor with the `new` keyword
    - We use `this` to set the object's properties and methods
    - We don't supply an explicit return value (we can, but usually don't)

  - `Car` object:
  ```javascript
  let corrola = new Car('Toyota', 'Corolla', 2016);
  
  corolla.make;    // => 'Toyota'
  corolla.model;   // => 'Corrolla'
  corolla.year;    // => 2016
  corolla.started; // => false
  
  corolla.start();
  corolla.started; // => true
  ```
  - Notice the `new` keyoword precedes the function invocation. This combination of using `new` with a function call treats the function as a constructor
  - JavaScript takes the following steps when you invoke a function with `new`:
    1. It creates an entirely new object
    1. It sets the prototype of the new object to the object that is referenced by the constructor's `prototype` property. 
    1. It sets the value of `this` for use inside the function to point to the new object
    1. It invokes the function. Since `this` refers to the new object, we use it within the function to set the object's properties and methods
    1. Finally, once the function finishes running, `new` returns the new object even though we don't explicitly return anything

  - **JavaScript won't complain about a missing `new` keyword**
    - If you don't use the `new` keyword, the constructor function wont' work as intended. Instead, it acts like an ordinary function. In particular, the value of `this` depends on how the function is called. Crucially, it won't get set to reference the new object. 
    - Calling a constructor withouth `new` also returns `undefined` rather than the new object

  - You can use `new` to call almost any JavaScript function you create, however, you cannot call arrow functions with `new` since they use their surrounding context as the value of `this`:
  ```javascript
  let Car = (make, model, year) => {
    this.make = make;
    this.model = model;
    this.year = year;
  }
  
  new Car(); // TypeError: Car is not a constructor
  ```

  - You can also use `new` on methods you define in objects
  ```javascript
  let foo = {
    Car: function(make, model, year) {
      this.make = make;
      this.model = model;
      this.year = year;
    }
  };
  
  let car1 = new foo.Car('Toyota', 'Camry', 2019);
  car1.make; //=> 'Toyota'
  ```
  - However, calling a method defined with concise syntax (also called a concise method) won't work:
  ```javascript
  let foo = {
    Car(make, model, year) {
      this.make = make;
      this.model = model;
      this.year = year;
    }
  };
  
  new foo.Car(); //=> Uncaught TypeError: foo.Car is not a constructor
  ```
  - In addition, many, but not all, built-in objects and methods are incompatible with `new`
  - `new` is also incompatible with special functions known as **generators**
  
  ## Constructors with Explicit Return Values
  - What happens when you use `new` to call a function that returns an explicit value?
  ```javascript
  function Cat(name, breed, weight) {
    this.name = name;
    this.breed = breed;
    this.weight = weight;
  
    return 'a cat';
  }
  
  let fluffy = new Cat('fluffy', 'Persian', 15);
  fluffy.weight; // 15
  ```
  - Even though we explicitly returned the string `a cat`, our constructor returned the cat object with `name`, `breed`, and `weight` properties

  - However, if you return an object, it returns that object instead of a new object
  ```javascript
  function Cat(name, breed, weight) {
    this.name = name;
    this.breed = breed;
    this.weight = weight;
  
    return { foo: 1 };
  }
  
  let fluffy = new Cat('fluffy', 'Persian', 15);
  fluffy.weight; // undefined
  fluffy.foo; // 1
  ```
  
  ## Supplying Constructor Arguments with Plain Objects
  - If our constructor function grows and requires lots of parameters, it provides plenty of opportunities for mistakes
  ```javascript
  function Car(make, model, year, color, passengers, convertible, mileage) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.color = color;
    this.passengers = passengers;
    this.convertible = convertible;
    this.mileage = mileage;
    this.started = false;
  
    this.drive = function() {
      this.started = true;
    };
  
    // rest of the methods
  }
  ```
  - One common technqiue we can use to manage our parameters better involves passing them to our constructor with an object argument:
  ```javascript
  let civicArgs = {
    make: 'Honda',
    model: 'Civic',
    year: 2016,
    color: 'black',
    passengers: 5,
    convertible: false,
    mileage: 16000
  }
  
  let civic = new Car(civicArgs);
  ```
  - Then we rework our `Car` constructor to accept an object as an argument:
  ```javascript
  function Car(args) {
    this.make = args.make;
    this.model = args.model;
    this.year = args.year;
    this.color = args.color;
    this.passengers = args.passengers;
    this.convertible = args.convertible;
    this.mileage = args.mileage;
    this.started = false;
  
    this.drive = function() {
      this.started = true;
    };
  
    // rest of methods
  }
  ```
  - With `Object.assign`, we can simplify this constructor considerably:
  ```javascript
  function Car(args) {
    Object.assign(this, args);
  
    this.drive = function() {
      this.started = true;
    };
  
    // rest of the methods
  }
  ```
  - One drawback of the `Object.assign` approach is that the `args` object may contain properties that `Car` object doesn't need. Those additional properties will get added to the `Car` object. They may just be excess baggage for the objects to carry around, but they may also cause trouble

  ## Determining an Object's Type
  - The `instanceof` operator lets us determine whether a given constructor created an object:
  ```javascript
  let civicArgs = {
    make: 'Honda',
    model: 'Civic',
    year: 2016,
    color: 'black',
    passengers: 5,
    convertible: false,
    mileage: 16000
  };
  
  let civic = new Car(civicArgs);
  
  if (civic instanceof Car) {
    console.log("It's a car!");
  } else {
    console.log("It's not a car.");
  }
  ```
  - The `new` operator object that is returned contains some information that ties it back to the constructor that created the object. The `instanceof` operator uses that information to determine what constructor created the object.

  ## `new` and Implicit Execution Context
  - The constructor call with `new` provides an implicit execution context along with the function call and method calls
  - When you call a function with `new`, its implicit context is the new object

  ## Constructors with Prototypes
  - Let's take a look at what happens when we create some objects with a constructor:
  ```javascript
  function Dog(name, breed, weight) {
    this.name = name;
    this.breed = breed;
    this.weight = weight;
  
    this.bark = function() {
      console.log(this.weight > 20 ? 'Woof!' : 'Yip!');
    };
  }
  
  let maxi = new Dog('Maxi', 'German Shepherd', 32);
  let dexter = new Dog('Dexter', 'Rottweiler', 50);
  let biggie = new Dog('Biggie', 'Whippet', 9);
  
  maxi.bark(); // 'Woof!'
  ```
  - Every time that we create a new dog object, we must create a new `bark` method so we can add it to the object
    - We're not repeating any code, but the runtime must create a new copy of the method every time we create an object
  
  ## Method Delegation to Prototypes
  - We can define a method once in the prototype object and let the inheriting objects delegate the method calls to the prototype. We can use prototypes with constructors to achieve the same result:
  ```javascript
  let DogPrototype = {
    bark() {
      console.log(this.weight > 20 ? 'Woof!' : 'Yip!');
    }
  };
  
  function Dog(name, breed, weight) {
    Object.setPrototypeOf(this, DogPrototype);
    this.name = name;
    this.breed = breed;
    this.weight = weight;
    // this.bark method removed.
  }
  ```
  - We've changed our `Dog` constructor and create a `DogPrototype` object. The first thing we do inside the constructor is set `DogPrototype` as the prototype of the newly created dog object. We then assign the arguments to the properties
  - We can then use the constructor without change, however, the `bark` method isn't defined on the individual objects, but is, instead, defined on the [[Prototype]] property

  - It would be better if we can establish the constructor and prototype relationship more concretely, however.
  - Let's assign the prototype object to a property of the `Dog` function:
  ```javascript
  // Delete DogPrototype
  
  function Dog(name, breed, weight) {
    Object.setPrototypeOf(this, Dog.myPrototype);
    // rest of the code
  }
  
  Dog.myPrototype = {
    bark() {
      console.log(this.weight > 20 ? 'Woof!' : 'Yip!');
    }
  };
  ```
  - This is a bit like a recursive function. `myPrototype` object gets assigned to the constructor, not the instance. That means that each instance doesn't have access to `myPrototype` and can only be accessed by `Dog.myPrototype`. Setting this to the instance prototype allows you to encapsulate the prototype within the Object.

  ## The Constructor `prototype` Property
  - What makes constructors special is a characteristic of all function objects in JavaScript: They all have a `prototype` property that we call the **function prototype** to distinguish them from the prototypes used when creating ordinary objects. Let's take a look:
  ```javascript
  Dog.prototype; // => Dog {}
  ```
  - When you call a function `Foo` with the `new` keyword, JavaScript sets the new object's prototype to the curent value of `Foo`'s `prototype` property. That is, the constructor creates an object that inherits from the constructor function's prototype. 

  - **Note**: If `bar` is an object, then the object from which `bar` inherits is the **object prototype**. By default, constructor functions set the object prototype for the objects they create to the constructor's prototype object.
  - The **constructor's prototype object**, also called the **function prototype**, is a function object that the constructor uses as the object prototype for the objects it creates. In other words, each object that the constructor creates inherits from the constructor's prototype object. The constructor stores its prototype object in its `prototype` property; that is, if the constructor's name is `Foo`, then `Foo.prototype` references the constructors prototype object.
  - Every JavaScript function has a `prototype` property, but it is only used when you call the function as a constructor using the `new` keyword. 
    - Rather than create a prototype object as part of the Constructor function, we can use the built in `prototype` property
    ```javascript
    function Dog(name, breed, weight) {
      // deleted Object.setPrototypeOf(this, Dog.myPrototype);
      this.name = name;
      this.breed = breed;
      this.weight = weight;
    }
    
    Dog.prototype.bark = function() {
      console.log(this.weight > 20 ? 'Woof!' : 'Yip!');
    };
    
    let maxi = new Dog('Maxi', 'German Shepherd', 32);
    maxi.bark(); // 'Woof!'
    
    let biggie = new Dog('Biggie', 'Whippet', 9);
    biggie.bark(); // 'Yip!'
    ```

  - An example of how a constructor function work with a constructor function named `Foo`
    1. It creates an entirely new object
    1. It sets `Foo.prototype` as the prototype for the new object. That is, the new object inheirts from the object referenced by `Foo.prototype`
    1. It sets the execution context (`this`) for the function to point to the new object
    1. It invokes the function
    1. It returns the new object unless the function returns another **object**

  - A property of interest on a prototype object is the `constructor` property
  ```javascript
  Dog.prototype.constructor; // [Function: Dog]
  ```
  - As with the `instanceof` operator, the `constructor` property lets us determine the type of an object:
  ```javascript
  let maxi = new Dog('Maxi', 'German Shepherd', 32);

  if (maxi.constructor === Dog) {
    console.log("It's a dog");
  } else {
    console.log("It's not a dog");
  }
  ```
  - Be careful, however! It's possible to reassign the `constructor` property to something else. Use `instanceof` to determine if an object is an instance of a constructor

  ## Overriding the Prototype
  - Inheriting methods from a prototype doesn't mean that the inheriting object is stuck with those methods. Two objects created with the same constructor may end up looking completely different from each other because of the changes and additions made after constructing the object. 
  - We can define a custom `bark` method on an instance
  ```javascript
  let maxi = new Dog('Maxi', 'German Shepherd', 32);
  let dexter = new Dog('Dexter', 'Rottweiler', 50);

  dexter.bark = function() {
    console.log('WOOF!')
  }

  maxi.bark();   // Woof!
  dexter.bark(); // WOOF!
  ```
  - The `dexter` object now has its own `bark` method that **overrides** the `bark` method from `Dog.prototype`. 

 ## Static and Instance Properties and Methods
  ## Instance Properties
  - Properties of an instance are called **instance properties**
  - From our previous example of `Dog`, we can only access the instance properties from the instance object:
  ```
  maxi.weight; // 32
  ```
  - If we try to use the constructor, it won't work:
  ```
  Dog.weight; // undefined
  ```
  - This code returns `undefined` since `weight` isn't a property of the constructor, it's a property of the instances created by that constructor. 

  ## Instance Methods
  - Methods usually aren't stored directly in instances. Instead, they are usually defined in the object's prototype object. While they aren't defined in the instance object, they still operate on the individual instances, therefore, they are still refered to as instance methods.
  - As with `weight`, we must use an object created by the `Dog` constructor to invoke `bark`:
  ```
  maxi.bark(); // Woof!
  ```
  - We can't use the constructor to call this method:
  ```
  Dog.bark(); // TypeError: Dog.bark is not a function
  ```
  - Any method defined in any prototype in the prototype chain of an object is considered to be an instance method of the object

  ## Static Properties
  - **Static properties** are defined and accessed directly on the constructor, not on an instance or a prototype. Typically, static properties belong to the type (e.g. `Dog`) rather than to the indvidiual instances or the prototype objec.t
  - One common use of static properties is to keep track of all the objects created by a constructor:
  ```javascript
  function Dog(name, breed, weight) {
    this.name = name;
    this.breed = breed;
    this.weight = weight;
    Dog.allDogs.push(this);
  }
  
  Dog.allDogs = [];
  ```
  - In this case, the static property `allDogs` contains an array with a reference to every dog object created while the program is running. 
  - While `allDogs` maintains a list of all the dogs, it isn't information that is pertinent to a specific dog, therefore it should be a static property

  ## Static Methods
  ```javascript
  Dog.showSpecies = function() {
    console.log(`Dogs belong to the species ${Dog.species}`);
  };
  
  Dog.showSpecies();
  ```
  - Built-in methods such as `Object.assign`, `Array.isArray`, and `Date.now` are all examples of static methods

## Classes
  - Let's define a simple `Rectangle` using the constructor/prototype pattern:
  ```javascript
  function Rectangle(length, width) {
    this.length = length;
    this.width = width;
  }
  
  Rectangle.prototype.getArea = function() {
    return this.length * this.width;
  };
  
  let rec = new Rectangle(10, 5);
  console.log(typeof Rectangle);         // function
  console.log(rec instanceof Rectangle); // true
  console.log(rec.constructor);          // [Function: Rectangle]
  console.log(rec.getArea());            // 50
  ```
  - Now, let's define the same with a **class declaration**:
  ```javascript
  class Rectangle {
    constructor(length, width) {
      this.length = length;
      this.width = width;
    }
  
    getArea() {
      return this.length * this.width;
    }
  }
  
  let rec = new Rectangle(10, 5);
  console.log(typeof Rectangle);         // function
  console.log(rec instanceof Rectangle); // true
  console.log(rec.constructor);          // [class Rectangle]
  console.log(rec.getArea());            // 50
  ```
  - Class declarations begin with the `class` keyword, followed by the name of the class. The rest of the syntax looks similar to the simplified (concise) method definition that you can use in object literals. There are no commas between the poperties of the class, however.
  - The constructor is now a method named `constructor` inside our class instead of being a standalone function
  - Other methods that get defined get placed in the `prototype` of the constructor
  - In most situations, instatiating a new object from a class is identical to creating one with the constructor/prototype pattern:
  ```javascript
  let rec = new Rectangle(10, 5);
  ```
  - You can even call methods on `Rectangle.property` in the same way:
  ```javascript
  console.log(rec.getArea());            // 50
  ```
  - And `typeof` even returns `function`

  - One minor difference is that `rec.constructor` may produce different results between the two patterns. For example, logging `rec.constructor` produces `[Function: Rectangle]` for the constructor/prototype pattern and `[class Rectangle]` for the class pattern, though it isn't considered significant
  - One significatn difference: you **must** use the `new` keyowrd to call the constructor when using a `class`. JavaScript raises a `TypeError` if you try to call the constructor without the `new` keyword.

  ## Class Expressions
  - Functions have an expression form that does not require a name after the `function` keyword. Classes have a similar expression form. 
  ```javascript
  let Rectangle = class {
    constructor(length, width) {
      this.length = length;
      this.width = width;
    }
  
    getArea() {
      return this.length * this.width;
    }
  };
  ```
  - Class expressions are functionally equivalent to class declarations, it's a matter of style

  ## Classes as First-Class Citizens
  - A **first-class citizen** is a value that can be passed into a function, returned from a function, and assigned to a variable.
  - Classes, like functions, are also first-class values. After all, classes are just functions!
  ```javascript
  function createObject(classDef) {
    return new classDef();
  }
  
  class Foo {
    sayHi() {
      console.log('Hi!');
    }
  }
  
  let obj = createObject(Foo);
  obj.sayHi(); //=> logs 'Hi!'
  ```

  ## Static Methods and Properties
  - You can define static methods on your custom constructor methods
  ```javascript
  function Rectangle(length, width) {
    this.length = length;
    this.width = width;
  }
  
  Rectangle.getDescription = function() {
    return 'A rectangle is a shape with 4 sides';
  }
  
  console.log(Rectangle.getDescription()); // A rectangle is a shape with 4 sides
  ```
  - You can define static methods with the class keyword as well: just use the `static` keyword:
  ```javascript
  class Rectangle {
    constructor(length, width) {
      this.length = length;
      this.width = width;
    }
  
    static getDescription() {
      return 'A rectangle is a shape with 4 sides';
    }
  
    getArea() {
      return this.length * this.width;
    }
  }
  
  console.log(Rectangle.getDescription()); // A rectangle is a shape with 4 sides
  ```

  - You can also define static properties (e.g. `length` used by the `String` type)
  - To define a static property with the constructor and prototype pattern, just add it to the constructor functoin object:
  ```javascript
  Rectangle.description = 'A rectangle is a shape with 4 sides';
  ```
  - To do the same with a `class`, just use the static keyword inside the `class`:
  ```javascript
  class Rectangle {
    static description = 'A rectangle is a shape with 4 sides';
  }
  ```
  - This is a newer addition to JavaScript. You can also achieve the same thing in older browsers by using the same pattern as the constructor/prototype pattern.

  