const fs = require('fs');

setInterval(() => {
  fs.unlink('./heheheheh.js', err => {
    if (err) {
      console.error(err);
    }
  })
}, 1000);