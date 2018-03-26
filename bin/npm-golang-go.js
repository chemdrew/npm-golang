#!/usr/bin/env node

const program = require('commander');
const defaults = require('../lib/defaults');
const go = require('../lib').go;

program
  .version(defaults.version, '-v, --version')
  .parse(process.argv);

go(program.args, console.error);
