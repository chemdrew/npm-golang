const targz = require('targz');

module.exports = (src, dest) => {
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
