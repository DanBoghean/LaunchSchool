let a = {foo: 'a'};
let b = {bar: 'b'};
Object.setPrototypeOf(b, a);

for (let property in b) {
  console.log(`${property}: ${b[property]}`);
}

Object.keys(b).forEach(property => {
  console.log(`${property}: ${b[property]}`);
});