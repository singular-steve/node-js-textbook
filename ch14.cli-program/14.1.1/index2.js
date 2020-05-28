#!/usr/bin/env node
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.clear();

const answerCallback = answer => {
  if (answer === 'y') {
    console.log('Thank you!');
    rl.close();
  } else if (answer === 'n') {
    console.log('Sorry.');
    rl.close();
  } else {
    console.clear();
    console.log('Answer y or n');
    rl.question('Is this fun? (y/n) ', answerCallback);
  }
};


rl.question('Is this fun? (y/n) ', answerCallback);