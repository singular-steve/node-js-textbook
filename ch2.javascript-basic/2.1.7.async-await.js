const findAndSaveUser = async (Users) => {
  try {
    let user = await Users.findOne({});
    user.name = 'hi';
    user = await User.save();
    user = await Users.findOne({gender: 'm'});
    // ...
  } catch (error) {
    console.log(error);
  }
};

const promise1 = Promise.resolve('success1');
const promise2 = Promise.resolve('success2');

const promiseAll = async () => {
  for await (promise of [promise1, promise2]) {
    console.log(promise);
  }
};
