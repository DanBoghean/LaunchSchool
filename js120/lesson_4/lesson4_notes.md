# JS120

## Lesson 4 Notes

### Object Creation with Prototypes

  ## The OLOO Pattern
  - The **OLOO** or **Objects Linking to Other Objects** pattern uses prototypes and involves extracting properties common to all objects of the same type to a prototype object. All objects of the same type then inherit from that prototype

  - Example: 
  ```javascript
  function createCar(make, model, year) {
    return {
      make,
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
  ```
  
  - Let's do it with car objects. What properties are common to all car objects? 
    - In the example above, those properties are the `start` and `stop` methods
    - All cars have `make`, `model`, `year`, and `started` properties as well, but each object has different values for those properties, thus we dont' count them as being common to all cars

  - We can extract the `start` and `stop` methods to a prototype object
  ```javascript
  let carPrototype = {
    start: function() {
      this.started = true;
    },
  
    stop: function() {
      this.started = false;
    },
  };
  ```
  - Now that we have a car prototype object, all car objects can inherit from it:
  ```javascript
  let car1 = Object.create(carPrototype);
  car1.make = 'Toyota';
  car1.model = 'Corolla';
  car1.year = 2016;
  ```
  - We setup a car prototype that all our car objects can inherit, however, we still have the problem of `make`, `model`, and `year` properties being entered manually for every new object. The most common technique to automate this is to use an `init` methodn on the prototype object:
  ```javascript
  let carPrototype = {
    start: function() {
      this.started = true;
    },
  
    stop: function() {
      this.started = false;
    },
  
    init(make, model, year) {
      this.make = make;
      this.model = model;
      this.year = year;
    },
  };
  ```
  - We can then use it like this:
  ```javascript
  let car1 = Object.create(carPrototype);
  car1.init('Toyota', 'Corolla', 2016);
  ```

  - While this is better, it still needs two lines of code to create a new car object. A small improvement can change that:
  ```javascript
  let carPrototype = {
    // code omitted for brevity
  
    init(make, model, year) {
      this.make = make;
      this.model = model;
      this.year = year;
      return this;
    },
  };
  ```
  - Since init now returns a reference to the car object it was called on, we can chain `create` and `init` and assign the result to the `car` variable:
  ```javascript
  let car1 = Object.create(carPrototype).init('Toyota', 'Corolla', 2016);
  ```

  - You can use both factory functions and the OLOO pattern to bulk create objects of the same type. 
    - The OLOO pattern has one significant advantage over factory functions: memory efficiency
    - All objects created with the OLOO pattern inherit methods from a single prototype object, the objects that inherit from that prototype object share the same methods.
    - An advantage of the factory pattern is that it lets us create objects with private state. 
  
  ## Subtyping with Constructors and Prototypes
  - Inheritance means someting a bit different in other languages than from the way we use it in JavaScript
  - Here is an example that shows why we might need inheritance in an application. 
  ```javascript
  function Rectangle(length, width) {
    this.length = length;
    this.width = width;
  }
  
  Rectangle.prototype.getArea = function() {
    return this.length * this.width;
  };
  
  Rectangle.prototype.toString = function() {
    return `[Rectangle ${this.length} x ${this.width}]`;
  };
  ```
  - We can create a manipulate `Rectangle` objects like so:
  ```javascript
  let rect = new Rectangle(10, 5);
  rect.getArea();     // => 50
  rect.toString();    // => "[Rectangle 10 x 5]"
  ```
  - Suppose the application also needs squares. We can setup another constructor/prototype combo for those squares and follow the same pattern we used for rectangles:
  ```javascript
  function Square(size) {
    this.length = size;
    this.width = size;
  }
  
  Square.prototype.getArea = function() {
    return this.length * this.width;
  };
  
  Square.prototype.toString = function() {
    return `[Square ${this.length} x ${this.width}]`;
  };
  
  let sqr = new Square(5);
  sqr.getArea();     // => 25
  sqr.toString();    // => "[Square 5 x 5]"
  ```
  - There's some code duplication between this and the `Rectangle` code, particularly the `Square.prototype.getArea` and `Rectangle.prototype.getArea` which are identical.
  - We can use prototype inheritance to our advantage here. If we think about the `Square` as a special kind of `Rectangle`, we can think of it as a **sub-type** of `Rectangle`. Another way of saying it is that `Rectangle` is a **super-type** of `Square`.
  ```javascript
  function Square(size) {
    this.length = size;
    this.width = size;
  }
  
  Square.prototype = Object.create(Rectangle.prototype);
  
  Square.prototype.toString = function() {
    return `[Square ${this.length} x ${this.width}]`;
  };
  
  let sqr = new Square(5);
  sqr.getArea();     // => 25
  sqr.toString();    // => "[Square 5 x 5]"
  ```
  - Since a function's `prototype` property is writable, we can reassign `Square.prototype` to an object that inherits from `Rectangle.prototype`. The resulting prototype chain looks like this:
  ```
  sqr -> Square.prototype -> Rectangle.prototype -> Object.prototype
  ```
  - All objects created by the `Square` constructor inherit from `Square.prototype`, which we have setup to inherit from `Rectangle.prototype`. Thus, all square objects have access to methods on `Rectangle.prototype`. Since `toString` must be different for squares, we override it in `Square.prototype`. That is, we customize `Square.prototype.toString`. Since `getArea` requires no customization, we can let square objects use the inherited `Rectangle.prototype.getArea`

  ##  Restoring the `constructor` property
  - One side-effect of this approach is that the `constructor` property on the square object points to `Rectangle` when it should poin to `Square` instead.
    - Why does this happen? It happens since we reassign `Square.prototype` to a new object that inherits from `Rectangle.prototype`, and the `constructor` property for `Rectangle.prototype` points back to `Rectangle`. 
    - To fix this situation, we merely need to reassign the `Square.prototype.constructor` to `Square`:
    ```javascript
    function Square(size) {
      this.length = size;
      this.width = size;
    }
    
    Square.prototype = Object.create(Rectangle.prototype);
    Square.prototype.constructor = Square;
    
    Square.prototype.toString = function() {
      return `[Square ${this.length} x ${this.width}]`;
    }
    
    let sqr = new Square(5);
    sqr.getArea();              // => 25
    sqr.toString();             // => "[Square 5 x 5]"
    sqr.constructor === Square; // => true
    ```
    - Failure to reassign it won't hurt anything. However, there are situations where the value of the `constructor` property is important.

  ## Constructor Reuse
  - If you examine the bodies of `Rectangle` and `Square` functions, you'll see that they are similar. That suggests we may be able to use the `Rectangle` constructor in `Square`. To do that, we must invoke `Rectangle` with its execution context explicitly set to the execution context of `Square`:
  ```javascript
  function Square(size) {
    Rectangle.call(this, size, size);
  }
  ```
  - Our code now looks like this:
  ```javascript
  function Rectangle(length, width) {
    this.length = length;
    this.width = width;
  }
  
  Rectangle.prototype.getArea = function() {
    return this.length * this.width;
  };
  
  Rectangle.prototype.toString = function() {
    return `[Rectangle ${this.length} x ${this.width}]`;
  };
  
  // rect test code omitted
  
  function Square(size) {
    Rectangle.call(this, size, size);
  }
  
  Square.prototype = Object.create(Rectangle.prototype);
  Square.prototype.constructor = Square;
  
  Square.prototype.toString = function() {
    return `[Square ${this.length} x ${this.width}]`;
  };
  
  // sqr test code omitted
  ```

  ## Prototypal Inheritance vs. Pseudo-Classical Inheritance
  - The simpler form of inheritance is **prototypal inheritance** or **prototypal delegation**. We sometimes call this form of inheritance **object inheritance** since it works with one object at a time. An object's internal `[[Prototype]]` property points to another object, and the object can delegate method calls to that other object. Example:
  ```javascript
  let personPrototype = {
    name: '',
    age: 0,
    toString() {
      return `My name is ${this.name} and I'm ${this.age} years old.`;
    },
  };
  
  let will = Object.create(personPrototype);
  will.name = 'William';
  will.age = 28;
  will.toString(); // => My name is William and I'm 28 years old.
  ```

  - We've also seen another form of inheritance: **pseudo-classical inheritance** also called **constructor inheritance**. When people talk about *inheritance* in the context of JavaScript, they generally mean this type of inheritance. In pseudo-classical inheritance, a constructor's prototype inherits from another constructor's prototype; that is, a sub-type inherits from a super-type. The term "pseudo-classical" referes to the fact that constructor inheritance mimics classes from other OOP languages, but doesn't actually use classes.

  ## Inheritance with Class Declarations
  - We can turn code that inherits from another constructor's prototype such as this into a class inheritance:
  ```javascript
  function Rectangle(length, width) {
    this.length = length;
    this.width = width;
  }
  
  Rectangle.prototype.getArea = function() {
    return this.length * this.width;
  };
  
  Rectangle.prototype.toString = function() {
    return `[Rectangle ${this.length} x ${this.width}]`;
  };
  
  function Square(size) {
    Rectangle.call(, size, size);
  }
  
  Square.prototype = Object.create(Rectangle.prototype);
  Square.prototype.constructor = Square;
  
  Square.prototype.toString = function() {
    return `[Square ${this.length} x ${this.width}]`;
  };
  ```

  ```javascript
  class Rectangle {
    constructor(length, width) {
      this.length = length;
      this.width = width;
    }
  
    getArea() {
      return this.length * this.width;
    }
  
    toString() {
      return `[Rectangle ${this.width * this.length}]`;
    }
  }
  
  class Square extends Rectangle {
    constructor(size) {
      super(size, size);
    }
  
    toString() {
      return `[Square] ${this.width * this.length}`;
    }
  }
  ```
  - The `extends` keyword signifies that hte class named to the left of `extends` should inherit from the class specified to the right of `extends`. 

  - Note also that the `Square` constructor calls a function that is represented by the keyword `super`. When called inside the `constructor` method, the `super` keyword refers to the constructor method from the parent class (the class we inherit from). Thus, `super(size, size)` performs the same role performed by this code from our constructor/prototype example:
  ```javascript
  function Square() {
    Rectangle.call(this, size, size);
  }
  ```
  - You don't need to use `super` in every subclass, but in most cases you do. In particular, if the superclass's constructor creates any object properties, you must call `super` to ensure those properties are set properly. For instance, in the `Rectangle` class above, we create two properties in the `Rectangle` constructor, so we must call `super` in `Square`'s constructor. 
    - If you do call `super` in a subclass's constructor, you must call it before you use `this` in that constructor
  
  ## Inheritance with Class Expressions
  - Here is another example of inheritance with classes:
  ```javascript
  let Person = class {
    construcotr(name, age) {
      this.name = name;
      this.age = age;
    }

    sayName() {
      console.log(`My name is ${this.name}.`);
    }
  };

  let Student = class extends Person {
    constructor(name, age, semester) {
      super(name, age);
      this.semester = semester;
    }

    enrollInCourse(courseNumber) {
      console.log(`${this.name} has enrolled in course ${courseNumber}`);
    }
  };

  let student = new Student('Kim', 22, 'Fall');
  student.sayName(); // logs `My name is Kim.'
  student.enrollInCourse
  ```
  - In this example, the `Student` class inherits from the `Person` class. That gives student objects access to methods of the `Person` class and extends person objects further by adding a `semester`property and an `enrollInCourse` method. Notice that we've reused `Person`'s constructor inside the `Student` constructor and calling `super` with `name` and `age` since the `Student` constructor expects those arguments. We also assign the `semester` argument to the `semester` property after `super` returns. Here we use class experessions instead of class declarations.

## Code Reuse with Mixins
  - One problem with inheritance in JavaScript is that objects can inheirt from only one object and classes can extend only one other class. This is called **single inheritance**. Some programming languages allow for **multiple inheritance**, however JavaScript doesn't support that. 
    - Note: The prototypical chain inheritance is not multiple inheritance, each object still only inherits from one other object. 
  - This can be limiting and sometimes makes modelling some problem domains challenging. 

  ## Mix-ins
  - Mix-ins are a pattern that adds methods and properties from one object to another. It's not delegation with prototypes; the mix-in pattern merely copies the properties of one object to another with `Object.assign` or some similar technique. 

  - For example, in the bird world, there are birds that can swim and birds that can fly, but there are also birds that can't swim and birds that can't fly, some birds can even do both:
    Bird	Swim?	Fly?
    Stork	no	yes
    Parrot	no	yes
    Penguin	yes	no
    Ostrich	yes	no
    Duck	yes	yes
    Goose	yes	yes
  - To model this in JavaScript with inheritance we start like this:
  ```javascript
  class Bird {}
  
  class Stork extends Bird {
    fly() {}
  }
  
  class Parrot extends Bird {
    fly() {}
  }
  
  class Penguin extends Bird {
    swim() {}
  }
  
  class Ostrich extends Bird {
    swim() {}
  }
  
  class Duck extends Bird {
    swim() {}
    fly() {}
  }
  
  class Goose extends Bird {
    swim() {}
    fly() {}
  }
  ```
  - That was easy enough, however, there's a lot of duplication going on. One way we can try to reduce the duplication is by using inheritance and a new class. Let's start with the `fly` method. We can define a `FlyingBird` type to handle this:
  ```javascript
  class Bird {}
  
  class FlyingBird extends Bird {
    fly() {}
  }
  
  class Stork extends FlyingBird {}
  
  class Parrot extends FlyingBird {}
  
  class Penguin extends Bird {
    swim() {}
  }
  
  class Ostrich extends Bird {
    swim() {}
  }
  
  class Duck extends FlyingBird {
    swim() {}
  }
  
  class Goose extends FlyingBird {
    swim() {}
  }
  ```
  - Great, let's see what happens when we try to refact the `swim` method:
  ```javascript
  class Bird {}
  
  class FlyingBird extends Bird {
    fly() {}
  }
  
  class SwimmingBird extends Bird {
    swim() {}
  }
  
  class Stork extends FlyingBird {}
  
  class Parrot extends FlyingBird {}
  
  class Penguin extends SwimmingBird {}
  
  class Ostrich extends SwimmingBird {}
  
  // Hmmm.... we have a problem.
  // What to do with ducks and geese???
  
  class Duck extends FlyingBird {
    swim() {}
  }
  
  class Goose extends FlyingBird {
    swim() {}
  }
  ```
  - We've hit a roadblock. The `Duck` and `Goose` classes represent both flying birds and swimming birds, but JavaScript only allows single inheritance. The lack of support for multiple inheritance means we can't just add a new class in and inherit from it.
  - Instead of using inheritance, we can use a **mix-in** instead. A mix-in is an object that defines one or more methods that can be "mixed in" to a class. This grants that class access to all of the methods in the object. It's the only real workaround for the lack of multiple inheritance short of duplication. 
  ```javascript
  const Swimmable = {
    swim() {};
  }
  
  class Bird {}
  
  class FlyingBird extends Bird {
    fly() {}
  }
  
  class Stork extends FlyingBird {}
  
  class Parrot extends FlyingBird {}
  
  class Penguin extends Bird {}
  Object.assign(Penguin.prototype, Swimmable);
  
  class Ostrich extends Bird {}
  Object.assign(Ostrich.prototype, Swimmable);
  
  class Duck extends FlyingBird {}
  Object.assign(Duck.prototype, Swimmable);
  
  class Goose extends FlyingBird {}
  Object.assign(Goose.prototype, Swimmable);
  ```
  - We've created a `Swimmable` object that has a `swim` method. To mix it into our various swimming birds, we've used `Object.assign` to add the methods from `Swimmable` to the prototype objects of those classes. It's a bit tedious, but not too difficult, and it works well.

  - For consistency, we could even eliminate the inheritance aspect entirely:
  ```javascript
  const Swimmable = {
    swim() {}
  }
  
  const Flyable = {
    fly() {}
  }
  
  class Stork {}
  Object.assign(Stork.prototype, Flyable);
  
  class Parrot {}
  Object.assign(Parrot.prototype, Flyable);
  
  class Penguin {}
  Object.assign(Penguin.prototype, Swimmable);
  
  class Ostrich {}
  Object.assign(Ostrich.prototype, Swimmable);
  
  class Duck {}
  Object.assign(Duck.prototype, Swimmable, Flyable);
  
  class Goose {}
  Object.assign(Goose.prototype, Swimmable, Flyable);
  ```

  ## Mix-ins vs. Inheritance
  - Some JavaScript developers argue that you should use factory functions with mix-ins exclusively. They suggest that inheritance fails at modeling some scenarios, but a combination fo factory functions and mix-ins can model any object relationship. Why bother with class/constructor inheritance at all? Why not just use factory functions that mix in other objects instead? If we did that, our code would look like this:
  ```javascript
  const Swimmable = {
    swim() {}
  }
  
  const Flyable = {
    fly() {}
  }
  
  function createFlyingBird() {
    return Object.assign({}, Swimmable);
  }
  
  function createSwimmingBird() {
    return Object.assign({}, Flyable);
  }
  
  function createTalentedBird() {
    return Object.assign({}, Swimmable, Flyable);
  }
  
  function createStork() {
    return createFlyingBird();
  }
  
  function createParrot() {
    return createFlyingBird();
  }
  
  function createPenguin() {
    return createSwimmingBird();
  }
  
  function createOstrich() {
    return createSwimmingBird();
  }
  
  function createDuck() {
    return createTalentedBird();
  }
  
  function createGoose() {
    return createTalentedBird();
  }
  ```
  - This approach is valid, but it suffers the downside of all factory functions:
    1. Every new object receives a new copy of all of its methods, including new copies of both mix-in methods and the methods that belong more directly to the object. That can be taxing on memory resources, even more so than the memory requirements of mix-nis.
    1. You can't determine the type of an object created with a factory function: the `instanceof` operator only recongizes these objects as instances of the `Object` type. As far as JavaScript is concerned, a penguin and a fish and an automobile are indistinguishable. That's not as troubling as it might sound in terms of being able to solve programming problems, but it has a more significatn impact on debugging.

  - We suggest a balance of mix-ins and classical inheritance pattern instead:
    1. Inheritance works well when one object type is positively a sub-type of another object. In our exampe, it's natural for a penguin to also be a swimming bird. These types have an **is a** relationship: a penguin *is a* swimming bird. Whenever two object types hae an "is a" relationship, constructor or class inheritance makes sense.
    1. On the other hand, the ability to swim doesn't have that kind of relationship with storks. Swimming is a capability that penguins have. Similarly, flying is a capability that storks have. When you want to endow your objects with some capability, a mix-in may be the correct choice. 

## Polymorphism
  - **Polymorphism** referes to the ability of objects with different types to respond in different ways to the same message (or method invocation). 
    - Data of different types can respond to a common interface.
    - When two or more object types have a method with the same name, we can invoke that method with any of those objects. When we don't care what type of object is calling the method, we're using polymorphism.
    - For example, assume we have a method that expects an argument that has a `move` method. We can pass it any type of argument, provided it has a compatible `move` method. The object might represent a human, a cat, a jellyfish, or even a car or train. That is, it lets objects of different types respond to the same method invocation

  ## Polymorphism Through Inheritance
  ```javascript
  class Animal {
    move() {}
  }

  class Fish extends Animal {
    move() {
      console.log("swimming");
    }
  }

  class Cat extends Animal {
    move() {
      console.log("walking");
    }
  }

  // Sponges and Corals don't have a separate move method - they don't move
  class Sponge extends Animal {}
  class Coral extends Animal {}

  let animals = [new Fish(), new Cat(), new Sponge(), new Coral()];
  animals.forEach(animal => animal.move());
  ```
  - Every object in the array is a different animal, but the interface for this class hierarchy lets us work with all those types in the same way even though the implementations may be dramatically different. That is polymorphism
  - For instance, if we run the above code, we call the `move` method for each of the 4 different kinds of animals.
    - For `Fish` objects, we call the `move` method from the `Fish` class, which enables a fish to swim. Likewise, a cat walks when we tell it to `move`. This is a simple example of polymorphism in which two different object types can respond to the same method call simply by **overriding** the appropriate method in the class. This is one form of **duck typing**. 
    - The `Sponge` and `Coral` classes dont' have a `move` method, at least no one of their won. Instead, they both inherit from the `Animal` class via the prototype chain. Thus, when we call `move` on a `Sponge` or `Coral` object, the `move` method in the `Animal` class gets called. This is polymorphism through inheritance - Instead of providing our own behavior for `move`, we're using inheritance to acquire the behavior of a supertype. 
    - Polymorphism with inheritance is useful with both constructors and classes. 
  
  - An example of polymorphism in action is the JavaScript `toString` method. The `Object` type provides a default implementation of `toString` that other types inherit. Other types can also implement a custom version of the method -- **override** the method -- that returns a string representation of the corresponding object. 

  ## Polymorphism Through Duck Typing
  - **Duck typing** occurs when objects of different unrelated types both respond to the same method name. With duck typing, we aren't concerned with the class or type of an object, but we do care whether an object has a particular behavior. *If an object quacks like a duck, then we can treat it as a duck*. Specifically, duck typing is a form of polymorphism. As long as the objects involved use the same method name, we can treat the object as belonging to a specific category of objects.
    - For example, an application may have a variety of elements that can respond to a mouse click by calling a method named something like `handleClick`. Those elements may be completely different - for instance, a checkbox vs a text input - but they're all *clickable* objects. Duck typing is an informal way to classify or ascribe a type to objects. Classes and constructos provide a more formal way to do that. 

  - This next example shows how you **shouldn't** implement polymorphic behavior without using duck typing:
  ```javascript
  class Chef {
    prepareFood(guests) {
      // implementation
    }
  }
  
  class Decorator {
    decoratePlace(flowers) {
      // implementation
    }
  }
  
  class Musician {
    preparePerformance(songs) {
      // implementation
    }
  }
  
  class Wedding {
    constructor(guests, flowers, songs) {
      this.guests = guests;
      this.flowers = flowers;
      this.songs = songs;
    }
  
    prepare(preparers) {
      preparers.forEach(preparer => {
        if (preparer instanceof Chef) {
          preparer.prepareFood(this.guests);
        } else if (preparer instanceof Decorator) {
          preparer.decoratePlace(this.flowers);
        } else if (preparer instanceof Musician) {
          preparer.preparePerformance(this.songs);
        }
      });
    }
  }
  ```
  - The problem here is that the `prepare` method has too many dependencies; it relies on specific classes and their names. It also needs to know which method it should call on each type of object, as well as the arguments that each method requires. If you change the way any of those methods are used or add a new type of preparer,  you must also change `Wedding.prototype.prepare`. For instance, if we need to add a dressmaker, we must add another `else` clause. With only 4 prepareres, `prepare` is already becoming long and messy.

  - The right way to implement this program is to use duck typing to implement polymorphism:
  ```javascript
  class Chef {
    prepare(wedding) {
      this.prepareFood(wedding.guests);
    }
  
    prepareFood(guests) {
      // implementation
    }
  }
  
  class Decorator {
    prepare(wedding) {
      this.decoratePlace(wedding.flowers);
    }
  
    decoratePlace(flowers) {
      // implementation
    }
  }
  
  class Musician {
    prepare(wedding) {
      this.preparePerformance(wedding.songs);
    }
  
    preparePerformance(songs) {
      // implementation
    }
  }
  
  class Wedding {
    constructor(guests, flowers, songs) {
      this.guests = guests;
      this.flowers = flowers;
      this.songs = songs;
    }
  
    prepare(preparers) {
      preparers.forEach(preparer => {
        preparer.prepare(this);
      });
    }
  }
  ```
  - Each of the preparer-type provides a `prepare` method. We still have polymorphism since all of the objects respond to the `prepare` method call. If we later need to add another preaprer type, we can create another class and implement the `prepare` method to perform the appropriate actions.