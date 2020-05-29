#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const readline = require('readline');

let rl;
let type = process.argv[2];
let name = process.argv[3];
let directory = process.argv[4] || '.';

const htmlTemplate = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <title>Template</title>
</head>
<body>
  <h1>Hello</h1>
  <p>CLI Test</p>
</body>
</html>`;

const routerTemplate = `const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  try {
    res.send('ok');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
`;

const exist = dir => {
  try {
    fs.accessSync(dir, fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK);
    return true;
  } catch (error) {
    return false;
  }
};

const mkdirp = dir => {
  const dirname = path.relative('.', path.normalize(dir))
    .split(path.sep)
    .filter(p => !!p);
  
  dirname.forEach((dir, index) => {
    const pathBuilder = dirname.slice(0, index + 1).join(path.sep);
    if (!exist(pathBuilder)) {
      fs.mkdirSync(pathBuilder);
    }
  })
};

const makeTemplate = () => {
  mkdirp(directory);
  if (type === 'html') {
    const pathToFile = path.join(directory, `${name}.html`);
    if (exist(pathToFile)) {
      console.error('File which has the same name already exist!');
    } else {
      fs.writeFileSync(pathToFile, htmlTemplate);
      console.log(pathToFile, 'Creating Succeed!!!');
    }
  } else if (type === 'express-router') {
    const pathToFile = path.join(directory, `${name}.js`);
    if (exist(pathToFile)) {
      console.error('File which has the same name already exist!');
    } else {
      fs.writeFileSync(pathToFile, routerTemplate);
      console.log(pathToFile, 'Creating Succeed!!!');
    }
  } else {
    console.error('Select html or express-router!');
  }
};

const dirAnswer = answer => {
  directory = (answer && answer.trim()) || '.';
  rl.close();
  makeTemplate();
}

const nameAnswer = answer => {
  if (!answer || !answer.trim()) {
    console.clear();
    console.log('You have to input the file name!');
    return rl.question('Input the file name.', nameAnswer);
  }
  name = answer;
  return rl.question('Input the directroy (It will be current folder)', dirAnswer);
};

const typeAnswer = answer => {
  if (answer !== 'html' && answer !== 'express-router') {
    console.clear();
    console.log('Select html or express-router!');
    return rl.question('Which type of template do you need? (html or express-router)', typeAnswer);
  }
  type = answer;
  return rl.question('Input the file name.', nameAnswer);
}

const program = () => {
  if (!type || !name) {
    rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    console.clear();
    rl.question('Which type of template do you need? (html or express-router)', typeAnswer);
  } else {
    makeTemplate();
  }
};

program();
