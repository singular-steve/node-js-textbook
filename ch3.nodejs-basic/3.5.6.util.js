const util = require('util');
const crypto = require('crypto');

const dontUseMe = util.deprecate((x, y) => {
  console.log(x + y);
}, 'dontUseMe is deprecated!');
dontUseMe(10, 20);

const randomBytesPromise = util.promisify(crypto.randomBytes);
randomBytesPromise(64)
.then(buf => {
  console.log(buf.toString());
})
.catch(err => {
  console.error(err);
});