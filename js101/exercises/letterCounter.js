// input: zero or more space separated words
// output: object shows the number of words of different sizes
// Split the words into an array. 
// Loop over the array and count the letters
// Add the length of each word to the object key

function wordSizes(str) {
  let wordArray = str.split(' ');
  let results = {};

  if (str === '') return {};

  wordArray.forEach(word => {
    if (!results.hasOwnProperty(word.length)) {
      results[word.length] = 1;
    } else {
      results[word.length] += 1;
    }
  });

  return results;
}

console.log(
  wordSizes('Four score and seven.'),                       // { "3": 1, "4": 1, "5": 1, "6": 1 }
  wordSizes('Hey diddle diddle, the cat and the fiddle!'),  // { "3": 5, "6": 1, "7": 2 }
  wordSizes("What's up doc?"),                              // { "2": 1, "4": 1, "6": 1 }
  wordSizes(''),                                            // {}
)