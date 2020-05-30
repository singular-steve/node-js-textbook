#!/usr/bin/env node
const program = require('commander');
const fs = require('fs');
const path = require('path');

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

program
  .version('1.0.0', '-v, --version')
  .usage('[options]');

program
  .command('template <type>')
  .usage('--name <name> --path [path]')
  .description('create templates')
  .alias('tmpl')
  .option('-n, --name <name>', 'Input the file name.', 'index')
  .option('-d, --directory [path]', 'Input the path to create the file.', '.')
  .action((type, options) => {
    makeTemplate(type, options.name, options.directory);
  });

program
  .command('*', { noHelp: true })
  .action(() => {
    console.log('Command not found!');
    program.help();
  });

program
  .parse(process.argv);