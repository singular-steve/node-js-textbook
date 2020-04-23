const candyMachine = {
  status: {
    name: 'node',
    count: 5,
  },
  getCandy() {
    this.status.count--;
    return this.status.count;
  },
};

const {getCandy, status: {count}} = candyMachine;

const array = ['node.js', {}, 1, true];
const [node, obj, , bool] = array;

