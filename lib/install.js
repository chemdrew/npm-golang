const defaults = require('./defaults');
const download = require('./_download');
const unpack = require('./_unpack');

module.exports = (program, cb) => {
  program = program || {};
  cb = cb || function(){};

  version = program.Version || defaults.go.version;
  platform = program.platform || defaults.platform;
  arch = program.arch || defaults.arch;

  from = program.from || `https://dl.google.com/go/go${version}.${platform}-${arch}.tar.gz`

  console.info(`-> downloading ${from}...`);
  download(from, defaults.go.tarPath).then(() => {
    console.info('-> unpacking...');
    return unpack(defaults.go.tarPath, defaults.go.dirPath);
  }).then(() => {
    // does gopath need to be set here?
    console.info('-> golang installation complete!');
    return cb();
  }).catch((err) => {
    console.info(err);
    return cb(err);
  });
}
