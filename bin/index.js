#!/usr/bin/env node

const program = require('commander');
const pJson = require('./../package.json');

program
  .version(pJson.version, '-v, --version')
  .command('install [options]', 'install the golang binary')
  .command('go <command> [options]', 'proxy commands into golang. Run "npm-golang go -help" for more information')
  .parse(process.argv);
