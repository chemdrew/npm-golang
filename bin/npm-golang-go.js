#!/usr/bin/env node

const program = require('commander');
const pJson = require('./../package.json');
const go = require('../lib').go;

program
  .version(pJson.version, '-v, --version')
  .parse(process.argv);

go(program.args, console.error);
