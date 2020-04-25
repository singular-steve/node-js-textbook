const timeout = setTimeout(() => {
  console.log('excute this after 1.5s');
}, 1500);

const interval = setInterval(() => {
  console.log('excute this every 1s');
}, 1000);

const timeout2 = setTimeout(() => {
  console.log('not excuted');
}, 3000);

setTimeout(() => {
  clearTimeout(timeout2);
  clearTimeout(interval);
}, 2500);

const immediate = setImmediate(() => {
  console.log('excute immediatly');
});

const immediate2 = setImmediate(() => {
  console.log('not excuted');
});

clearImmediate(immediate2);