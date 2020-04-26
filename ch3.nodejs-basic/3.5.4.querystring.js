const url = require('url');
const querystring = require('querystring');

const parsedUrl = url.parse('https://www.naver.com/?search=hello&name=123&name=helloman&page=10&pagesize=50#anchor');
const query = querystring.parse(parsedUrl.query);
console.log('querystring.parse(): ', query);
console.log('querystring.stringify(): ', querystring.stringify(query));