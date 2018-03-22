#!/usr/bin/env node

const program = require('commander');
const os = require('os');
const https = require('https');
const fs = require('fs');
const targz = require('targz');
const pJson = require('./../package.json');

const latestVersion = '1.10';

program
  .version(pJson.version, '-v, --version')
  .description('Download and install the Go binaries')
  .option('-V, --Version', `version to download, defaults to ${latestVersion}`)
  .option('-a, --arch', `installation arch, defaults to ${getArch()}`)
  .option('-p, --platform', `installation platform, defaults to ${os.platform()}`)
  .option('-f, --from', `url to download from, defaults to getting binaries from https://golang.org/dl/`)
  .parse(process.argv);

version = program.Version || latestVersion;
platform = program.platform || os.platform();
arch = program.arch || getArch();

from = program.from || `https://dl.google.com/go/go${version}.${platform}-${arch}.tar.gz`

const tarFileLocation = `${process.env.PWD}/go-download.tar.gz`;
const fileLocation = `${process.env.PWD}/go-download`;

console.info(`-> downloading ${from}...`);
return downloadBinary(from, fs.createWriteStream(tarFileLocation)).then(() => {
  console.info('-> unpacking...');
  return untar(tarFileLocation, fileLocation);
}).then(() => {
  console.log('-> golang installation complete!');
  /*
    set go path
    */
}).catch((err) => {
  console.error(err);
});

function downloadBinary(from, to) {
  return new Promise((resolve) => {
    const request = https.get(from, (response) => {
      response.pipe(to);
      response.on('end', () => {
        return resolve();
      });
    });
  });
}

function untar(src, dest) {
  return new Promise((resolve, reject) => {
    targz.decompress({
      src: src,
      dest: dest
    }, (err) => {
      if (err) return reject(err);
      return resolve();
    });
  });
}

function getArch() {
  const arch = os.arch();
  if (arch === 'x64') return 'amd64';
  return arch;
}