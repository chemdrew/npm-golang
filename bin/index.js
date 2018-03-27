#!/usr/bin/env node

const program = require('commander');
const defaults = require('../lib/defaults');

program
  .version(defaults.version, '-v, --version')
  .command('install [options]', 'install the golang binary')
  .command('unpack <file>', 'unpack a preinstalled golang binary into the executeable path')
  .command('go <command> [options]', 'proxy commands into golang. Run "npm-golang go -help" for more information')
  .parse(process.argv);
