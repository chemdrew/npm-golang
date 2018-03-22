#!/usr/bin/env node

const program = require('commander');
const pJson = require('./../package.json');
const spawn = require('child_process').spawn;

program
  .version(pJson.version, '-v, --version')
  .parse(process.argv);

spawn('./go-download/go/bin/go', program.args, { stdio: 'inherit' });
