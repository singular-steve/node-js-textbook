const fs = require('fs');

console.log('### start ###');

let data = fs.readFileSync('./3.6.readme.txt');
console.log('### 1st read ', data.toString());
data = fs.readFileSync('./3.6.readme.txt');
console.log('### 2nd read ', data.toString());
data = fs.readFileSync('./3.6.readme.txt');
console.log('### 3rd read ', data.toString());

console.log('### end ###')

