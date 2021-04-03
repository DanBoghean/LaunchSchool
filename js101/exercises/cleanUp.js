function cleanUp(str) {
  var letters = 'abcdefghijklmnopqrstuvwxyz';
  return Array.from(str).reduce((previous, current) => {
    if (letters.includes(current) || letters.toUpperCase().includes(current)) {
      return previous + current;
    } else if (previous[previous.length - 1] !== ' ') {
      return previous + ' ';
    }
    return previous;
  }, '');
}

console.log(cleanUp("---what's my +*& line?"));    // " what s my line "