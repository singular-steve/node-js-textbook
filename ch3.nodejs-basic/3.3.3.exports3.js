const { odd, even } = require('./3.3.1.exports1');
const checkNumber = require('./3.3.2.exports2');

const checkString = str => {
  if (str.length % 2) {
    return odd;
  } else {
    return even;
  }
};

console.log(checkNumber(10));
console.log(checkNumber(11));
console.log(checkString('Hi'));
console.log(checkString('Hello'));