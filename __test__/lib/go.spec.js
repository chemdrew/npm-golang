const test = require('ava');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const mocks = {};

let go;

test.beforeEach(t => {
  mocks['child_process'] = { spawn: sinon.stub() };
  mocks['./defaults'] = { go: { executable: 'golang' } };
  go = proxyquire('./../../lib/go', mocks);
});

test('defaults to help', t => {
  go();
  const assertion = mocks['child_process'].spawn.calledWith('golang', ['help'], { stdio: 'inherit' });
  t.true(assertion, `Process executed with ${JSON.stringify(mocks['child_process'].spawn.args[0])}`);
});

test('runs arguments', t => {
  go(['run', 'some', 'code']);
  const assertion = mocks['child_process'].spawn.calledWith('golang', ['run', 'some', 'code'], { stdio: 'inherit' });
  t.true(assertion, `Process executed with ${JSON.stringify(mocks['child_process'].spawn.args[0])}`);
});
