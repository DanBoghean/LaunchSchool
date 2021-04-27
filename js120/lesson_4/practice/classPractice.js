class Greeting {
  greet(message) {
    console.log(message);
  }
}

class Hello extends Greeting {
  hi() {
    this.greet("Hello");
  }
}

class Goodbye extends Greeting {
  bye() {
    this.greet("Goodbye");
  }
}

let hey = new Hello();
console.log(Object.getOwnPropertyNames(hey));
hey.hi();

let bye = new Goodbye();
bye.bye();

