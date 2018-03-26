const os = require('os');
const path = require('path');
const pJson = require('./../package.json');

function getArch() {
  const arch = os.arch();
  if (arch === 'x64') return 'amd64';
  return arch;
}

module.exports = {
  version: pJson.version,
  arch: getArch(),
  platform: os.platform(),
  go: {
    version: '1.10',
    tarPath: path.join(__dirname, '..', '/go-download.tar.gz'),
    dirPath: path.join(__dirname, '..', '/go-download'),
    executable: path.join(__dirname, '..', '/go-download/go/bin/go')
  }
}