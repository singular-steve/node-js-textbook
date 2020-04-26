const url = require('url');

const URL = url.URL;
const myURL = new URL('https://www.naver.com/?search=hello#anchor');

console.log('### WHATWG 방식 ###');
console.log('new URL(): ', myURL);
console.log('url.format(): ', url.format(myURL));
console.log('\n### url 방식 ###');
const parseURL = url.parse('https://www.naver.com/?search=hello#anchor');
console.log('url.parse(): ', parseURL);
console.log('url.format(): ', url.format(parseURL));