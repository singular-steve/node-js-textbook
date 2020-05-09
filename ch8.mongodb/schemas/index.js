const mongoose = require('mongoose');

module.exports = () => {
  const connect = () => {
    if (process.env.NODE_ENV !== 'production') {
      mongoose.set('debug', true);
    }
    mongoose.connect('mongodb://rawcoder:password@localhost:27017/admin', {
      dbName: 'nodejs',
    }, error => {
      if (error) {
        console.error('mongodb connection error!', error);
      } else {
        console.log('mongodb connected!');
      }
    });
  };
  connect();
  mongoose.connection.on('error', error => {
    console.error('mongodb connection error!', error);
  });
  mongoose.connection.on('disconnected', () => {
    console.error('mongodb disconnected. try connecting.');
    connect();
  });
  require('./user');
  require('./comment')
};
