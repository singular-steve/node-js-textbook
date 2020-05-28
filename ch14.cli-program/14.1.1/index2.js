#!/usr/bin/env node
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Is this fun? (y/n) ', answer => {
  if (answer === 'y') {
    console.log('Thank you!');
  } else if (answer === 'n') {
    console.log('Sorry.');
  } else {
    console.log('y or n');
  }
  rl.close();
});