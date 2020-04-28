const fs = require('fs');

fs.readdir('./folder', (err, dir) => {
  if (err) {
    throw err;
  }
  console.log('### folder : ', dir);
  fs.unlink('./folder/newFile.js', err => {
    if (err) {
      throw err;
    }
    console.log('success to delete a file');
    fs.rmdir('./folder', err => {
      if (err) {
        throw err;
      }
      console.log('success to delete a folder');
    });
  });
});