const string = 'abc';
const number = 1;
const boolean = true;
const obj = {
  outside: {
    inside: {
      key: 'value',
    },
  },
};
console.time('TotalTime');
console.log('This is a normal log');
console.log(string, number, boolean);
console.error('This is an error log');

console.dir(obj);
console.dir(obj, {colors: false, depth: 1});
console.dir(obj, {color: true, depth: 2});

console.time('Time1');
for (let i = 0; i < 100000; i++) {
  continue;
}
console.timeEnd('Time1');

const tracingFunction = () => {
  console.trace('This is an error trace log');
};
const startFunction = () => tracingFunction();
startFunction();

console.timeEnd('TotalTime');