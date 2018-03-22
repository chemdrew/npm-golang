#!/usr/bin/env node

const program = require('commander');
const os = require('os');
const pJson = require('./../package.json');
const install = require('../lib').install;

const latestVersion = '1.10';

program
  .version(pJson.version, '-v, --version')
  .description('Download and install the Go binaries')
  .option('-V, --Version', `version to download, defaults to ${latestVersion}`)
  .option('-a, --arch', `installation arch, defaults to ${getArch()}`)
  .option('-p, --platform', `installation platform, defaults to ${os.platform()}`)
  .option('-f, --from', `url to download from, defaults to getting binaries from https://golang.org/dl/`)
  .parse(process.argv);

install(program, console.error);

function getArch() {
  const arch = os.arch();
  if (arch === 'x64') return 'amd64';
  return arch;
}