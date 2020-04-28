const fs = require('fs');

fs.access('./folder', fs.constants.F_OK || fs.constants.R_OK || fs.constants.W_OK, (err) => {
  if (err) {
    if (err.code === 'ENOENT') {
      console.log('folder is not exist');
      fs.mkdir('./folder', err => {
        if (err) {
          throw err;
        }
        console.log('success to make a folder');
        fs.open('./folder/file.js', 'w', (err, fd) => {
          if (err) {
            throw err;
          }
          console.log('success to make an empty file');
          fs.rename('./folder/file.js', './folder/newFile.js', err => {
            if (err) {
              throw err;
            }
            console.log('success to rename a file');
          });
        });
      });
    } else {
      throw err;
    }
  } else {
    console.log('folder is already exist');
  }
});