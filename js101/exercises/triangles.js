function triangle(num) {
  for (let i = 1; i <= num; i++) {
    let spaces = ' '.repeat(num - i);
    console.log(spaces + "*".repeat(i));
  }
}

triangle(9);