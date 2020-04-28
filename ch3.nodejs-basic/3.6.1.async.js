const fs = require('fs');

console.log('### start ###');

fs.readFile('./3.6.readme.txt', (err, data) => {
  if (err) {
    throw err;
  }
  console.log('### 1st read ', data.toString());
});

fs.readFile('./3.6.readme.txt', (err, data) => {
  if (err) {
    throw err;
  }
  console.log('### 2nd read ', data.toString());
});

fs.readFile('./3.6.readme.txt', (err, data) => {
  if (err) {
    throw err;
  }
  console.log('### 3rd read ', data.toString());
});

console.log('### end ###')

