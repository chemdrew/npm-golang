#!/usr/bin/env node

const os = require('os');
const https = require('https');
const fs = require('fs');
const path = require('path');
const program = require('commander');
const pJson = require('./../package.json');
const targz = require('targz');

const latestVersion = '1.10';

program
  .version(pJson.version, '-v, --version')
  .command('install [options]', 'install the golang binary')
  .command('go <command> [options]', 'proxy commands into golang. Run "npm-golang go -help" for more information')
  .parse(process.argv);
