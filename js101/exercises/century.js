function century(num) {
  let suffixList = ['th', 'st', 'nd', 'rd'];
  let cen = Math.ceil(num / 100);
  let lastDigit = cen % 10;
  let lastTwoDigits = cen % 100;
  let index = lastDigit > 3 ? 0 : lastDigit;
  let suffix = ((10 < lastTwoDigits) && (lastTwoDigits < 14))
                  ? suffixList[0] : suffixList[index];

  return `${cen}${suffix}`;
}
console.log(
  century(2000),        // "20th"
  century(2001),        // "21st"
  century(1965),        // "20th"
  century(256),         // "3rd"
  century(5),           // "1st"
  century(16503),       // "102nd"
  century(1052),        // "11th"
  century(1127),        // "12th"
  century(11201),       // "113th"
  century(1510)
)