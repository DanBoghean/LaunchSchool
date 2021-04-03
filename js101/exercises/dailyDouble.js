function crunch(str) {
  let newStr = Array.from(str).reduce((previous, current) => {
    if (previous[previous.length - 1] === current) {
      return previous;
    }

    return previous + current;
  }, '');

  console.log(newStr);
}

crunch('ddaaiillyy ddoouubbllee');    // "daily double"
crunch('4444abcabccba');              // "4abcabcba"
crunch('ggggggggggggggg');            // "g"
crunch('a');                          // "a"
crunch('');                           // ""