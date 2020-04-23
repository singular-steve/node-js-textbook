function add1(x, y) {
  return x + y;
}

const add2 = (x, y) => {
  return x + y;
};

const add3 = (x, y) => x + y;

function not1(x) {
  return !x;
}

const not2 = (x) => !x;


// this 바인드 방식이 달라짐
var relationship = {
  name: 'hi',
  friends: ['hello', 'hiyo', 'yo'],
  logFriends: function() {
    var that = this;
    this.friends.forEach(function(friend) {
      console.log(that.name, friend);
    });
  },
};
relationship.logFriends();

const relationship2 = {
  name: 'hi',
  friends: ['hello', 'hiyo', 'yo'],
  logFriends() {
    this.friends.forEach(friend => {
      console.log(this.name, friend);
    });
  },
};
relationship2.logFriends();