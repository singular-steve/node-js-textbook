process.on('uncaughtException', err => {
  console.error('uncaughtException', err);
});

setInterval(() => {
  throw new Error('Heheheh this is an error!!!');
}, 1000);

setTimeout(() => {
  console.log('...ing');
}, 2000);