const sayNode = function() {
  console.log('Node');
};
let es = 'ES';

const newObject = {
  sayJS() {
    console.log('JS');
  },
  sayNode,
  [es + 6]: 'Wow',
};

newObject.sayJS();
newObject.sayNode();
console.log(newObject.ES6);