const fs = require('fs');

const readStream = fs.createReadStream('./3.6.readme-long.txt');
const writeStream = fs.createWriteStream('./3.6.writeme-pipe.txt');
readStream.pipe(writeStream);
