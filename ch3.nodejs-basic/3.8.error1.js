setInterval(() => {
  console.log('### start ###');
  try {
    throw new Error('This is an error!!!!');
  } catch (err) {
    console.error(err);
  }
}, 1000);