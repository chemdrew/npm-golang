#!/usr/bin/env node

const program = require('commander');
const defaults = require('../lib/defaults');
const go = require('../lib').go;

program
  .version(defaults.version, '-v, --version')
  .parse(process.argv);

if (!program.args.length) {
  console.error('Invalid arguments!');
  console.error('-> npm-golang help go');
  program.outputHelp();
  process.exit(1);
}

go(program.args, console.error);
