// input = array of numbers
// output = array with same number of elements
// rules = Each element's value is the running total from the original array

// Iterate over the elements
// Create a sum value
// Add to current value to the sum value and the push it to the array that gets returned

function runningTotal(arr) {
  let sum = 0;
  let results = arr.map(num => {
    sum += num;
    return sum;
  })
  return results;
}

console.log(
  runningTotal([2, 5, 13]),             // [2, 7, 20]
  runningTotal([14, 11, 7, 15, 20]),    // [14, 25, 32, 47, 67]
  runningTotal([3]),                    // [3]
  runningTotal([]),                     // []
)