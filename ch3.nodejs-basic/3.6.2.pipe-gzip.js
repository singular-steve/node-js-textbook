const zlib = require('zlib');
const fs = require('fs');

const readStream = fs.createReadStream('./3.6.readme-long.txt');
const zlibStream = zlib.createGzip();
const writeStream = fs.createWriteStream('./3.6.writeme-pipe-gzip.txt.gz');
readStream.pipe(zlibStream).pipe(writeStream);