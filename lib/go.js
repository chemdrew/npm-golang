const spawn = require('child_process').spawn;
const defaults = require('./defaults');

module.exports = (args) => {
  args = args || ['help'];
  spawn(defaults.go.executable, args, { stdio: 'inherit' });
}
