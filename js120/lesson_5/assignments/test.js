let PetProtoptye = {
  sleep() {
    console.log("I am sleeping");
  },

  wake() {
    console.log("I am awake");
  },

  init(name, animal) {
    this.name = name;
    this.animal = animal;
    return this;
  }
};

let pudding = Object.create(PetProtoptye).init("Cat", "Pudding");
console.log(`I am a ${pudding.animal}. My name is ${pudding.name}.`);
pudding.sleep();
pudding.wake();