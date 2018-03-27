#!/usr/bin/env node

const program = require('commander');
const defaults = require('../lib/defaults');
const install = require('../lib').install;

const latestVersion = '1.10';

program
  .version(defaults.version, '-v, --version')
  .description('Download and install the go binaries')
  .option('-V, --Version <version>', `version to download, defaults to ${defaults.go.version}`)
  .option('-a, --arch <arch>', `installation arch, defaults to ${defaults.arch}`)
  .option('-p, --platform <platform>', `installation platform, defaults to ${defaults.os}`)
  .option('-f, --from <from>', `url to download from, defaults to getting binaries from https://golang.org/dl/`)
  .parse(process.argv);

install(program, console.error);
