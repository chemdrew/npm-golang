const spawn = require('child_process').spawn;
const path = require('path');

module.exports = (args) => {
  args = args || ['help'];
  spawn(path.join(__dirname, '..', '/go-download/go/bin/go'), args, { stdio: 'inherit' });
}
