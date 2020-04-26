const { URL } = require('url');

const myURL = new URL('https://www.naver.com/?search=hello&name=123&name=helloman&page=10&pagesize=50#anchor');
console.log('searchParams: ', myURL.searchParams);
console.log('searchParams.getAll(): ', myURL.searchParams.getAll('name'));
console.log('searchParams.get(): ', myURL.searchParams.get('search'));
console.log('searchParams.has():', myURL.searchParams.has('page'));

console.log('searchParams.keys(): ', myURL.searchParams.keys());
console.log('searchParmas.values(): ', myURL.searchParams.values());

myURL.searchParams.set('filter', 'es6');
console.log('searchParams.getAll(): ', myURL.searchParams.getAll('filter'));

myURL.searchParams.set('filter', 'es5');
myURL.searchParams.set('filter', 'es8');
console.log('searchParams.getAll(): ', myURL.searchParams.getAll('filter'));

myURL.searchParams.delete('filter');
console.log('searchParams.getAll(): ', myURL.searchParams.getAll('filter'));

console.log('searchParams.toString(): ', myURL.searchParams.toString());