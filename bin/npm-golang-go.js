const program = require('commander');
const pJson = require('./../package.json');
const spawn = require('child_process').spawn;

program
  .version(pJson.version, '-v, --version')
  .parse(process.argv);

// spawn('ls', { stdio: 'inherit' });
spawn('./go-download/go/bin/go', program.args, { stdio: 'inherit' });
