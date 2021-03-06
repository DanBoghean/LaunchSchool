function uuid() {
  let arr = [];
  let characters = 'abcdef0123456789';
  arr.length = 32;

  for (let i = 0; i < arr.length; i++) {
    arr[i] = characters[Math.floor(Math.random() * characters.length)];
  }
  let j = arr.join('');
  return `${j.slice(0, 9)}-${j.slice(9, 13)}-${j.slice(13, 17)}-${j.slice(17, 21)}-${j.slice(21)}`;
}

console.log(uuid());