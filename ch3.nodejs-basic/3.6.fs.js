const fs = require('fs');

fs.readFile('./3.6.readme.txt', (err, data) => {
  if (err) {
    throw err;
  }
  console.log(data);
  console.log(data.toString());
});

fs.writeFile('./3.6.writeme.txt', 'Nice to meet you, world!', (err) => {
  if (err) {
    throw err;
  }
  fs.readFile('./3.6.writeme.txt', (err, data) => {
    if (err) {
      throw err;
    }
    console.log(data);
    console.log(data.toString());
  });
});

