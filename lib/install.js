const fs = require('fs');
const path = require('path');
const request = require('request');
const targz = require('targz');
const os = require('os');

const latestVersion = '1.10';

const tarFileLocation = path.join(__dirname, '..', 'go-download.tar.gz');
const fileLocation = path.join(__dirname, '..', 'go-download');

module.exports = (program, cb) => {
  program = program || {};
  cb = cb || function(){};

  version = program.Version || latestVersion;
  platform = program.platform || os.platform();
  arch = program.arch || getArch();
  
  from = program.from || `https://dl.google.com/go/go${version}.${platform}-${arch}.tar.gz`

  console.info(`-> downloading ${from}...`);
  downloadBinary(from, tarFileLocation).then(() => {
    console.info('-> unpacking...');
    return untar(tarFileLocation, fileLocation);
  }).then(() => {
    // does gopath need to be set here?
    console.info('-> golang installation complete!');
    return cb();
  }).catch((err) => {
    console.log(err);
    return cb(err);
  });
}

function downloadBinary(from, to) {
  return new Promise((resolve, reject) => {
    request({
      url: from
    }, (err) => {
      if (err) return reject(err);
      return resolve();
    }).pipe(fs.createWriteStream(to));
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
