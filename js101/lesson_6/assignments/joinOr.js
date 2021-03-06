function joinOr(arr, delimiter = ', ', conjunction='or') {
  if (arr.length <= 1) {
    return arr.join();
  } else if (arr.length === 2) {
    return arr.join(` ${conjunction} `);
  } else {
    let subArr = arr.slice(0, arr.length - 1);
    let lastItem = arr[arr.length - 1];

    return `${subArr.join(delimiter)}${delimiter}${conjunction} ${lastItem}`;
  }
}

console.log(joinOr([1]));
console.log(joinOr([1, 2], ';', 'and'));
console.log(joinOr([]));
console.log(joinOr([1, 2, 3], ', ', 'and'));