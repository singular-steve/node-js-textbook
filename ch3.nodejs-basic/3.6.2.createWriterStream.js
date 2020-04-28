const fs = require('fs');

const writeStream = fs.createWriteStream('./3.6.writeme-long.txt');
writeStream.on('finish', () => {
  console.log('### finish writing ###');
});

writeStream.write('write 1\n');
writeStream.write('write 2\n');
writeStream.write('write 3\n');
writeStream.write('write 4\n');
writeStream.write('write 5\n');
writeStream.write('write 6\n');
writeStream.write('write 7\n');
writeStream.write('write 8\n');
writeStream.write('write 9\n');
writeStream.write('write 10');
writeStream.end();