#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const type = process.argv[2];
const name = process.argv[3];
const directory = process.argv[4] || '.';
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
    console.error('select html or express-router!');
  }
};

const program = () => {
  if (!type || !name) {
    console.error('SYNOPSIS\n\t mkt html|express-router file_name [path]');
  } else {
    makeTemplate();
  }
};

program();
