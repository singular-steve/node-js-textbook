const condition = true;
const promise = new Promise((resolve, reject) => {
  if (condition) {
    resolve('sucess');
  } else {
    reject('fail');
  }
});

promise
  .then(message => console.log(message))
  .catch(error => console.log(error));

promise
  .then(message => new Promise((resolve, reject) => resolve(message)))
  .then(message => new Promise((resolve, reject) => resolve(message)))
  .then(message => console.log(message))
  .catch(error => console.log(error));

function findAndSaveUser(Users) {
  Users.findOne({})
    .then(user => {
      user.name = 'hi';
      return user.save();
    })
    .then(user => Users.findOne({gender: 'm'}))
    .then(user => {
      // Do whatever you want!!
    })
    .catch(error => console.log(error));
}

const promise1 = Promise.resolve('success1');
const promise2 = Promise.resolve('success2');
Promise.all([promise1, promise2])
  .then(result => console.log(result))
  .catch(error => console.log(error));
