function logInBox(str) {
  console.log(`+-${'-'.repeat(str.length)}-+`);
  console.log(`| ${' '.repeat(str.length)} |`);
  console.log(`| ${str} |`);
  console.log(`| ${' '.repeat(str.length)} |`);
  console.log(`+-${'-'.repeat(str.length)}-+`);
}

console.log(logInBox('To boldly go where no on ehas gone before.'));