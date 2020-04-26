const path = require('path');

const filename = __filename;

console.log('path.sep: ', path.sep);
console.log('path.delimiter: ', path.delimeter);
console.log('-------------------------');
console.log('path.dirname(): ', path.dirname(filename));
console.log('path.extname():', path.extname(filename));
console.log('path.basename()', path.basename(filename));
console.log('path.basename()', path.basename(filename, path.extname(filename)));
console.log('-------------------------');
console.log('path.parse(): ', path.parse(filename));
console.log('path.format(): ', path.format({
  dir: 'c:\\users\\abc',
  name: 'path',
  ext: '.js',
}));
console.log('path.normalize(): ',path.normalize('c://users\\\abc\\\path.js'));
console.log('-------------------------');
console.log('path.isAbsolute(): ', path.isAbsolute('C://'));
console.log('path.isAbsolute(): ', path.isAbsolute('./home'));
console.log('-------------------------');
