# JS120

## Lesson 1 Notes

### What is OOP?
- Object-Oriented Programming is a programming paradigm in which we think about a problem in terms of objects that interact with each other
  - e.g. A real-world car object like a car has a **state** -- properties -- like color, number of doors, and fuel-level
    - It also has **behavior**, it can be started, driven, steered, or parked. 
  - This is how we think about problems in OOP: as a set of objects with state and behavior

- **Advantages**
  - It lets programmers think about a problem at a higher-level of abstraction, which helps them break down and solve the problem.
  - OOP helps programmers write programs that reduce the dependencies in a program, which makes maintenance easier
  - Done right, OOP makes code flexible, easy to understand, and easy to change
- **Disadvantages**
  - OOP programs are often much larger than the equivalent procedural program
  - OOP may lead to less efficient code; OO programs may require more memory, disk space, and computing power

### Encapsulation
- A fundamental concept of OOP that describes the idea of bundling or combining data and the operations that work on that data into a single entity e.g., an object.
- If a program keeps track of data about entities and performs operations on that data, it makes sense to combine the data and functionality into a single entity
- Encapsulation is about bundling state (data) and behavior (operations) to form an object
- Objects only expose a **public interface** for interacting with other objects and keep their implementation details hidden.
  - Other objects can't change data of an object without going through the proper interface
- **JavaScript doesn't support access restrictions**

- This object shows an example of encapsulation
  - Both the data and the operations are stored in one object
- Methods can be written without the need for `:`
- `this` can be used to reference the current object the method is in.
```
let raceCar = {
  make: 'BMW',
  fuelLevel: 0.5,
  engineOn: false,

  startEngine() {
    this.engineOn = true;
  },

  drive() {
    this.fuelLevel -= 0.1;
  },

  stopEngine() {
    this.engineOn = false;
  },

  refuel(percent) {
    if ((this.fuelLevel + (percent / 100)) <= 1) {
      this.fuelLevel += (percent / 100);
    } else {
      this.fuelLevel = 1;
    }
  },
};
```

### Collaborator Objects
- Objects that help provide state within another object are called **collaborator objects**, or more simply, **collaborators**. 
  - In this example, `cat`, which is stored in the `pete` object's property `pet`, is a collaborator object
  ```
  let cat = {
    name: 'Fluffy',
  
    makeNoise() {
      console.log('Meow! Meow!');
    },
  
    eat() {
      // implementation
    },
  };
  
  let pete = {
    name: 'Pete',
    pet: cat,
  
    printName() {
      console.log(`My name is ${this.name}!`);
      console.log(`My pet's name is ${this.pet.name}`);
    },
  };
  ```

### Object Factories
- Object factories are functions that create and return objects of a particular type
  ```
  let cat = {
    name: 'Fluffy',
  
    makeNoise() {
      console.log('Meow! Meow!');
    },
  
    eat() {
      // implementation
    },
  };
  
  let pete = {
    name: 'Pete',
    pet: cat,
  
    printName() {
      console.log(`My name is ${this.name}!`);
      console.log(`My pet's name is ${this.pet.name}`);
    },
  };
  ```

