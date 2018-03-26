const fs = require('fs');
const request = require('request');

module.exports = (from, to) => {
  return new Promise((resolve, reject) => {
    request({
      url: from
    }, (err) => {
      if (err) return reject(err);
      return resolve();
    }).pipe(fs.createWriteStream(to));
  });
}
