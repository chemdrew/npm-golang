#!/usr/bin/env node

const program = require('commander');
const path = require('path');
const defaults = require('../lib/defaults');
const unpack = require('../lib').unpack;

const latestVersion = '1.10';

program
  .version(defaults.version, '-v, --version')
  .description('Unpack a preinstall go binary')
  .description('Download and install the go binaries')
  .parse(process.argv);

  if (!program.args.length) {
    console.error('Invalid arguments!');
    console.error('-> npm-golang help unpack');
    program.outputHelp();
    process.exit(1);
  }

  unpack(path.join(process.cwd(), program.args[0]), defaults.go.dirPath);
