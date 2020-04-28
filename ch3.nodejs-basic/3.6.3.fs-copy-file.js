const fs = require('fs');

fs.copyFile('./3.6.readme-long.txt', '3.6.writeme-longlong.txt', err => {
  if (err) {
    throw err;
  }
  console.log('finish copying a file');
})