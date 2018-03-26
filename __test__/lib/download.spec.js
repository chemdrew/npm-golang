const test = require('ava');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const mocks = {};

let download;

test.beforeEach(t => {
  mocks['fs'] = { createWriteStream: sinon.stub() };
  mocks['request'] = sinon.stub();
  download = proxyquire('./../../lib/_download', mocks);
});

test.cb('downloads to a file', t => {
  mocks['request'].yields();
  download('some url', 'some file').then(() => {
    const assertion = mocks['request'].calledWith({ url: 'some url' });
    t.true(assertion, `request called with ${JSON.stringify(mocks['request'].args[0])}`);
    t.end();
  });
});

test.cb('error downloading', t => {
  mocks['request'].yields('some error');
  download('some url', 'some file').catch((err) => {
    t.is(err, 'some error', 'error is not the same as expected');
    const assertion = mocks['request'].calledWith({ url: 'some url' });
    t.true(assertion, `request called with ${JSON.stringify(mocks['request'].args[0])}`);
    t.end();
  });
});
