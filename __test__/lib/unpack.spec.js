const test = require('ava');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
const mocks = {};

let unpack;

test.beforeEach(t => {
  mocks['targz'] = { decompress : sinon.stub() };
  unpack = proxyquire('./../../lib/_unpack', mocks);
});

test.cb('unpacks to a file', t => {
  mocks['targz'].decompress.yields();
  unpack('some tar file', 'some directory').then(() => {
    const assertion = mocks['targz'].decompress.calledWith({ src: 'some tar file', dest: 'some directory' });
    t.true(assertion, `targz called with ${JSON.stringify(mocks['targz'].decompress.args[0])}`);
    t.end();
  });
});

test.cb('error unpacking', t => {
  mocks['targz'].decompress.yields('some error');
  unpack('some tar file', 'some directory').catch((err) => {
    t.is(err, 'some error', 'error is not the same as expected');
    const assertion = mocks['targz'].decompress.calledWith({ src: 'some tar file', dest: 'some directory' });
    t.true(assertion, `targz called with ${JSON.stringify(mocks['targz'].decompress.args[0])}`);
    t.end();
  });
});
